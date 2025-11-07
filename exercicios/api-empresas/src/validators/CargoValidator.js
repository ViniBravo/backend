const yup = require('yup');


const createSchema = yup.object().shape({
nome: yup.string().required('Nome é obrigatório'),
descricao: yup.string().required('Descricao é obrigatória'),
salario: yup.number().required('Salario é obrigatório').min(1518, 'Salario minimo é R$ 1.518,00'),
});


const updateSchema = yup.object().shape({
nome: yup.string(),
descricao: yup.string(),
salario: yup.number().min(1518, 'Salario minimo é R$ 1.518,00'),
});


module.exports = { createSchema, updateSchema };