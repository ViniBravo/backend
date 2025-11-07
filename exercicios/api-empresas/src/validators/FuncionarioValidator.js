const yup = require('yup');
const mongoose = require('mongoose');


const enderecoSchema = yup.object().shape({
cep: yup.string(),
logradouro: yup.string(),
numero: yup.string(),
complemento: yup.string(),
bairro: yup.string(),
cidade: yup.string(),
uf: yup.string(),
});


const objectIdTest = (value) => mongoose.Types.ObjectId.isValid(value);


const createSchema = yup.object().shape({
nome: yup.string().required('Nome é obrigatório'),
cpf: yup.string().required('CPF é obrigatório'),
email: yup.string().email('Email inválido').required('Email é obrigatório'),
telefone: yup.string().required('Telefone é obrigatório'),
data_contratacao: yup.date().required('Data de contratação é obrigatória'),
data_nascimento: yup.date().required('Data de nascimento é obrigatória'),
genero: yup.string().required('Genero é obrigatório'),
endereco: enderecoSchema.notRequired(),
cargo: yup.string().required('Cargo é obrigatório').test('is-objectid', 'Cargo inválido', objectIdTest),
departamento: yup.string().required('Departamento é obrigatório').test('is-objectid', 'Departamento inválido', objectIdTest),
});


const updateSchema = yup.object().shape({
nome: yup.string(),
cpf: yup.string(),
email: yup.string().email('Email inválido'),
telefone: yup.string(),
data_contratacao: yup.date(),
data_nascimento: yup.date(),
genero: yup.string(),
endereco: enderecoSchema,
cargo: yup.string().test('is-objectid', 'Cargo inválido', value => !value || objectIdTest(value)),
departamento: yup.string().test('is-objectid', 'Departamento inválido', value => !value || objectIdTest(value)),
});


module.exports = { createSchema, updateSchema };