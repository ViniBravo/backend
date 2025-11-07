const FuncionarioModel = require('../models/FuncionarioModel');
const CargoModel = require('../models/CargoModel');
const DepartamentoModel = require('../models/DepartamentoModel');
const { createSchema, updateSchema } = require('../validators/FuncionarioValidator');
const { validateID } = require('../validators/IDValidator');

class FuncionarioController {
  static async create(req, res) {
    try {
      await createSchema.validate(req.body, { abortEarly: false });

      // checar referências
      const { cargo, departamento } = req.body;
      if (!cargo || !departamento) {
        return res.status(400).json({ message: 'Cargo e Departamento são obrigatórios.' });
      }

      const cargoExists = await CargoModel.findById(cargo);
      if (!cargoExists) return res.status(400).json({ message: 'Cargo não encontrado.' });

      const deptExists = await DepartamentoModel.findById(departamento);
      if (!deptExists) return res.status(400).json({ message: 'Departamento não encontrado.' });

      const funcionario = await FuncionarioModel.create(req.body);
      await funcionario.populate(['cargo', 'departamento']);
      return res.status(201).json(funcionario);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao criar funcionário.', error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const funcionarios = await FuncionarioModel.find().populate(['cargo', 'departamento']);
      return res.status(200).json(funcionarios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar funcionários.' });
    }
  }

  static async getById(req, res) {
    try {
      validateID(req.params.id);
      const funcionario = await FuncionarioModel.findById(req.params.id).populate(['cargo', 'departamento']);
      if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado.' });
      return res.status(200).json(funcionario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      validateID(req.params.id);
      await updateSchema.validate(req.body, { abortEarly: false });

      // se vier cargo/departamento, validar existência
      if (req.body.cargo) {
        const cargoExists = await CargoModel.findById(req.body.cargo);
        if (!cargoExists) return res.status(400).json({ message: 'Cargo não encontrado.' });
      }
      if (req.body.departamento) {
        const deptExists = await DepartamentoModel.findById(req.body.departamento);
        if (!deptExists) return res.status(400).json({ message: 'Departamento não encontrado.' });
      }

      const updated = await FuncionarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate(['cargo', 'departamento']);
      if (!updated) return res.status(404).json({ message: 'Funcionário não encontrado.' });
      return res.status(200).json(updated);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação.', errors: error.errors });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      validateID(req.params.id);
      const removed = await FuncionarioModel.findByIdAndDelete(req.params.id);
      if (!removed) return res.status(404).json({ message: 'Funcionário não encontrado.' });
      return res.status(200).json({ message: 'Funcionário removido com sucesso.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = FuncionarioController;
