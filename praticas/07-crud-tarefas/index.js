const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://viniciusteixeira:viniciustcc8322@cluster0.mzpomuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => { 
    console.log('Conectado ao MongoDB')
})
.catch(err => { 
    console.error('Erro ao conectar ao MongoDB', err)
})

const TarefaModel = mongoose.model('Tarefas', new mongoose.Schema(
    {
      nome: String
    }
  ))
  
  // CRUD
  
  // Create
  app.post('/tarefas', async (req, res, next) => {
    const tarefa = req.body
    if (!tarefa.nome) {
      return res.status(400).json({ erro: "O campo nome é obrigatório!!!" })
    }
    const tarefaCriada = await TarefaModel.create(tarefa)
    res.status(201).json(tarefaCriada)
  })
  
  // READ
  app.get('/tarefas', async (req, res, next) => {
    const tarefas = await TarefaModel.find()
    res.json(tarefas)
  })
  
  // UPDATE
  app.put('/tarefas/:id', async (req, res, next) => {
    const id = req.params.id
    const tarefa = req.body
    if (!tarefa.nome) {
      return res.status(400).json({ erro: "O campo nome é obrigatório!!!" })
    }
  
    const tarefaAtualizada = await TarefaModel.findByIdAndUpdate(id, tarefa, { new: true })
  
    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada!!!" })
    }
    res.json(tarefaAtualizada)
  })
  
  // DELETE
  app.delete('/tarefas/:id', async (req, res, next) => {
    const id = req.params.id
    await TarefaModel.findByIdAndDelete(id)
    res.json({ mensagem: "Tarefa excluida!!!" })
  })
  
  // start
  app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
  })
