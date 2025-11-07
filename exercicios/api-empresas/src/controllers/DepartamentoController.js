const express = require('express');
const router = express.Router();

const Departamento = require('../models/DepartamentoModel');
const { createSchema, updateSchema } = require('../validators/DepartamentoValidator');
const validateId = require('../validators/IDValidator');

// CREATE - POST /departamentos
router.post('/', async (req, res, next) => {
  try {
    await createSchema.validate(req.body, { abortEarly: false });

    const novoDepartamento = await Departamento.create(req.body);
    res.status(201).json(novoDepartamento);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// READ ALL - GET /departamentos
router.get('/', async (_req, res, next) => {
  try {
    const departamentos = await Departamento.find();
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ BY ID - GET /departamentos/:id
// READ BY ID - GET /departamentos/:id
router.get('/:id', validateId, async (req, res) => {
    try {
      const departamento = await Departamento.findById(req.params.id);
  
      if (!departamento) {
        return res.status(404).json({ error: 'Departamento não encontrado' });
      }
  
      return res.status(200).json(departamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// UPDATE - PUT /departamentos/:id
router.put('/:id', validateId, async (req, res) => {
  try {
    await updateSchema.validate(req.body, { abortEarly: false });

    const departamentoAtualizado = await Departamento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!departamentoAtualizado) {
      return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    res.json(departamentoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// DELETE - DELETE /departamentos/:id
router.delete('/:id', validateId, async (req, res) => {
  try {
    const departamentoRemovido = await Departamento.findByIdAndDelete(req.params.id);

    if (!departamentoRemovido) {
      return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    res.json({ message: 'Departamento removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
