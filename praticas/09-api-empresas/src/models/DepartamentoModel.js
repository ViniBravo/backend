const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
    }
 )

    const DepartamentoModel = mongoose.model('Departamento', schema);

    module.exports = DepartamentoModel;