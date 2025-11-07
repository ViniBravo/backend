const express = require('express');
const router = express.Router();

const DepartamentoMoel = require('../models/CargoModel');
const {validateDepartamento} = require('../validators/CargoValidator');
const CargoModel = require('../models/CargoModel');

router.get('/cargos', async (req, res, next) => {
    const Cargos = await CargoModel.find();
    res.json(cargos);
});
       new CargoModel(req.body);
router.get('/cargos/:id', async (req, res, next) => {
    const cargoencontrado = await CargoModel.findById(req.params.id);
    if (!cargoencontrado) {
        return res.status(404).json({ erro: 'Cargo não encontrado' });
    }
    res.json(Cargoencontrado);
});

router.post('/cargos', validateCargo, async (req, res, next) => {
    const novoCargo = new CargoModel(req.body);
    await novoCargo.save();
    res.status(201).json(novoCargo);
});

router.put('/cargos/:id', validateCargo, async (req, res, next) => {
    const cargoAtualizado = await CargoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }

    );
    if (!cargoAtualizado) {
        return res.status(404).json({ erro: 'Cargo não encontrado' });
    }
    res.json(cargoAtualizado);
});

router.delete('/cargos/:id', async (req, res, next) => {
    const cargoDeletado = await CargoModel.findByIdAndDelete(req.params.id);
    if (!cargooDeletado) {
        return res.status(404).json({ erro: 'Cargo não encontrado' });
    }
    res.json({ mensagem: 'Cargo deletado com sucesso' });
});



module.exports = router 