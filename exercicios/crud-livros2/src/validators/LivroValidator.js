const yup = require('yup')

const createSchema = yup.object().shape({
  titulo: yup.string().required('titulo é obrigatório'),
  autor: yup.string().required('autor é obrigatório'),
  editora: yup.string().required('editora é obrigatória'),
  ano: yup.number().typeError('ano deve ser um número').required('ano é obrigatório'),
  preco: yup.number().typeError('preco deve ser um número').required('preco é obrigatório').min(0, 'preco deve ser positivo')
})

const updateSchema = yup.object().shape({
  titulo: yup.string(),
  autor: yup.string(),
  editora: yup.string(),
  ano: yup.number().typeError('ano deve ser um número'),
  preco: yup.number().typeError('preco deve ser um número').min(0, 'preco deve ser positivo')
})

const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (err) {
    const errors = err.inner ? err.inner.map(e => e.message) : [err.message]
    res.status(400).json({ errors })
  }
}

const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (err) {
    const errors = err.inner ? err.inner.map(e => e.message) : [err.message]
    res.status(400).json({ errors })
  }
}

module.exports = { validateCreate, validateUpdate }
