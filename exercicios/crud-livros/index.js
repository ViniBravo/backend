const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(express.json())

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err))

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true }
})

const Livro = mongoose.model('Livro', livroSchema)

app.post('/livros', async (req, res) => {
  try {
    const livro = new Livro(req.body)
    const novoLivro = await livro.save()
    res.status(201).json(novoLivro)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar livro' })
  }
})

app.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.find()
    res.json(livros)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar livros' })
  }
})

app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id)
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
    res.json(livro)
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido' })
  }
})

app.put('/livros/:id', async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado' })
    res.json(livroAtualizado)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar livro' })
  }
})

app.delete('/livros/:id', async (req, res) => {
  try {
    const livroRemovido = await Livro.findByIdAndDelete(req.params.id)
    if (!livroRemovido) return res.status(404).json({ erro: 'Livro não encontrado' })
    res.json({ mensagem: 'Livro removido com sucesso' })
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover livro' })
  }
})

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
