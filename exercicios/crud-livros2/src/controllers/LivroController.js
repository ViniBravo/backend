const express = require('express')
const Livro = require('../models/Livro')
const IDValidator = require('../validators/IDValidator')
const { validateCreate, validateUpdate } = require('../validators/LivroValidator')

const router = express.Router()

router.post('/', validateCreate, async (req, res) => {
  try {
    const livro = await Livro.create(req.body)
    res.status(201).json(livro)
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find().sort({ createdAt: -1 })
    res.json(livros)
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

router.get('/:id', IDValidator, async (req, res) => {
  try {
    const { id } = req.params
    const livro = await Livro.findById(id)
    if (!livro) return res.status(404).json({ errors: ['Livro não encontrado'] })
    res.json(livro)
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

router.put('/:id', IDValidator, validateUpdate, async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Livro.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ errors: ['Livro não encontrado'] })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

router.delete('/:id', IDValidator, async (req, res) => {
  try {
    const { id } = req.params
    const removed = await Livro.findByIdAndDelete(id)
    if (!removed) return res.status(404).json({ errors: ['Livro não encontrado'] })
    res.json({ message: 'Livro removido com sucesso' })
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

module.exports = router
