const CargoModel = require('../models/CargoModel');
const { createSchema, updateSchema } = require('../validators/CargoValidator');
const { validateID } = require('../validators/IDValidator');

class CargoController {
  static async create(req, res) {
    try {
      await createSchema.validate(req.body, { abortEarly: false });
      const cargo = await CargoModel.create(req.body);
      return res.status(201).json(cargo);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao criar cargo.', error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const cargos = await CargoModel.find();
      return res.status(200).json(cargos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar cargos.' });
    }
  }

  static async getById(req, res) {
    try {
      validateID(req.params.id);
      const cargo = await CargoModel.findById(req.params.id);
      if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado.' });
      return res.status(200).json(cargo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      validateID(req.params.id);
      await updateSchema.validate(req.body, { abortEarly: false });

      const updated = await CargoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Cargo não encontrado.' });
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
      const removed = await CargoModel.findByIdAndDelete(req.params.id);
      if (!removed) return res.status(404).json({ message: 'Cargo não encontrado.' });
      return res.status(200).json({ message: 'Cargo removido com sucesso.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = CargoController;
