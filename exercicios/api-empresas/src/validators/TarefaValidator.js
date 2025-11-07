const yup = require('yup');
const mongoose = require('mongoose');


const objectIdTest = (value) => mongoose.Types.ObjectId.isValid(value);


const createSchema = yup.object().shape({
titulo: yup.string().required('Titulo é obrigatório'),
descricao: yup.string().required('Descricao é obrigatória'),
data_inicio: yup.date().required('Data de inicio é obrigatória'),
data_fim: yup.date().required('Data fim é obrigatoria').when('data_inicio', (data_inicio, schema) => {
return data_inicio ? schema.min(new Date(data_inicio), 'Data fim deve ser posterior à data inicio') : schema;
}),
responsavel: yup.string().required('Responsável é obrigatório').test('is-objectid', 'Responsável inválido', objectIdTest),
projeto: yup.string().required('Projeto é obrigatório').test('is-objectid', 'Projeto inválido', objectIdTest),
});


const updateSchema = yup.object().shape({
titulo: yup.string(),
descricao: yup.string(),
data_inicio: yup.date(),
data_fim: yup.date().when('data_inicio', (data_inicio, schema) => {
return data_inicio ? schema.min(new Date(data_inicio), 'Data fim deve ser posterior à data inicio') : schema;
}),
responsavel: yup.string().test('is-objectid', 'Responsável inválido', value => !value || objectIdTest(value)),
projeto: yup.string().test('is-objectid', 'Projeto inválido', value => !value || objectIdTest(value)),
});


module.exports = { createSchema, updateSchema };