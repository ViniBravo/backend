const TarefaModel = require('../models/TarefaModel');
const FuncionarioModel = require('../models/FuncionarioModel');
const ProjetoModel = require('../models/ProjetoModel');
const { createSchema, updateSchema } = require('../validators/TarefaValidator');
const { validateID } = require('../validators/IDValidator');

class TarefaController {
  static async create(req, res) {
    try {
      await createSchema.validate(req.body, { abortEarly: false });

      const { responsavel, projeto } = req.body;
      if (!responsavel || !projeto) {
        return res.status(400).json({ message: 'Responsável e Projeto são obrigatórios.' });
      }

      const funcExists = await FuncionarioModel.findById(responsavel);
      if (!funcExists) return res.status(400).json({ message: 'Responsável (funcionário) não encontrado.' });

      const projExists = await ProjetoModel.findById(projeto);
      if (!projExists) return res.status(400).json({ message: 'Projeto não encontrado.' });

      const tarefa = await TarefaModel.create(req.body);
      await tarefa.populate(['responsavel', 'projeto']);
      return res.status(201).json(tarefa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao criar tarefa.', error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const tarefas = await TarefaModel.find().populate(['responsavel', 'projeto']);
      return res.status(200).json(tarefas);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar tarefas.' });
    }
  }

  static async getById(req, res) {
    try {
      validateID(req.params.id);
      const tarefa = await TarefaModel.findById(req.params.id).populate(['responsavel', 'projeto']);
      if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada.' });
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      validateID(req.params.id);
      await updateSchema.validate(req.body, { abortEarly: false });

      // se trocar responsavel/projeto, garantir existência
      if (req.body.responsavel) {
        const funcExists = await FuncionarioModel.findById(req.body.responsavel);
        if (!funcExists) return res.status(400).json({ message: 'Responsável (funcionário) não encontrado.' });
      }
      if (req.body.projeto) {
        const projExists = await ProjetoModel.findById(req.body.projeto);
        if (!projExists) return res.status(400).json({ message: 'Projeto não encontrado.' });
      }

      const updated = await TarefaModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate(['responsavel', 'projeto']);
      if (!updated) return res.status(404).json({ message: 'Tarefa não encontrada.' });
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
      const removed = await TarefaModel.findByIdAndDelete(req.params.id);
      if (!removed) return res.status(404).json({ message: 'Tarefa não encontrada.' });
      return res.status(200).json({ message: 'Tarefa removida com sucesso.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = TarefaController;
