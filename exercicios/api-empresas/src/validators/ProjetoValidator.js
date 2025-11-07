const yup = require('yup');


const createSchema = yup.object().shape({
nome: yup.string().required('Nome é obrigatório'),
descricao: yup.string().required('Descricao é obrigatória'),
data_inicio: yup.date().required('Data de inicio é obrigatória'),
data_fim: yup.date().required('Data fim é obrigatoria').when('data_inicio', (data_inicio, schema) => {
return data_inicio ? schema.min(new Date(data_inicio), 'Data fim deve ser posterior à data inicio') : schema;
}),
});


const updateSchema = yup.object().shape({
nome: yup.string(),
descricao: yup.string(),
data_inicio: yup.date(),
data_fim: yup.date().when('data_inicio', (data_inicio, schema) => {
return data_inicio ? schema.min(new Date(data_inicio), 'Data fim deve ser posterior à data inicio') : schema;
}),
});


module.exports = { createSchema, updateSchema };