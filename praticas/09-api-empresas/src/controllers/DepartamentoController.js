const express = require('express');
const router = express.Router();

const DepartamentoMoel = require('../models/DepartamentoModel');
const {validateDepartamento} = require('../validators/DepartamentoValidator');

router.get('/departamentos', async (req, res, next) => {
    const departamentos = await DepartamentoMoel.find();
    res.json(departamentos);
});

router.get('/departamentos/:id', async (req, res, next) => {
    const departamentoEncontrado = await DepartamentoMoel.findById(req.params.id);
    if (!departamentoEncontrado) {
        return res.status(404).json({ erro: 'Departamento não encontrado' });
    }
    res.json(departamentoEncontrado);
});

router.post('/departamentos', validateDepartamento, async (req, res, next) => {
    const novoDepartamento = new DepartamentoMoel(req.body);
    await novoDepartamento.save();
    res.status(201).json(novoDepartamento);
});

router.put('/departamentos/:id', validateDepartamento, async (req, res, next) => {
    const departamentoAtualizado = await DepartamentoMoel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }

    );
    if (!departamentoAtualizado) {
        return res.status(404).json({ erro: 'Departamento não encontrado' });
    }
    res.json(departamentoAtualizado);
});

router.delete('/departamentos/:id', async (req, res, next) => {
    const departamentoDeletado = await DepartamentoMoel.findByIdAndDelete(req.params.id);
    if (!departamentoDeletado) {
        return res.status(404).json({ erro: 'Departamento não encontrado' });
    }
    res.json({ mensagem: 'Departamento deletado com sucesso' });
});



module.exports = router 