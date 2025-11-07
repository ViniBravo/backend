const ProjetoModel = require('../models/ProjetoModel');
const { createSchema, updateSchema } = require('../validators/ProjetoValidator');
const { validateID } = require('../validators/IDValidator');

class ProjetoController {
  static async create(req, res) {
    try {
      await createSchema.validate(req.body, { abortEarly: false });
      const projeto = await ProjetoModel.create(req.body);
      return res.status(201).json(projeto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao criar projeto.', error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const projetos = await ProjetoModel.find();
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar projetos.' });
    }
  }

  static async getById(req, res) {
    try {
      validateID(req.params.id);
      const projeto = await ProjetoModel.findById(req.params.id);
      if (!projeto) return res.status(404).json({ message: 'Projeto não encontrado.' });
      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      validateID(req.params.id);
      await updateSchema.validate(req.body, { abortEarly: false });

      const updated = await ProjetoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Projeto não encontrado.' });
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
      const removed = await ProjetoModel.findByIdAndDelete(req.params.id);
      if (!removed) return res.status(404).json({ message: 'Projeto não encontrado.' });
      return res.status(200).json({ message: 'Projeto removido com sucesso.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProjetoController;
