const yup = require('yup');

const schema = yup.object().shape(
    {
        nome: yup.string().required('O campo nome é obrigatório').min(3, 'O campo nome deve ter no mínimo 3 caracteres'),
        descricao: yup.string().required('O campo descrição é obrigatório').min(10, 'O campo descrição deve ter no mínimo 10 caracteres'),
        
    }
)
async function validateDepartamento(req,res,next){
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => e.message);
        res.status(400).json({ erro: errors.errors });
    }
}
module.exports = validateDepartamento;