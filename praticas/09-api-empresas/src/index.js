const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()



app.use(express.json())


const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME


const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Servidor rodando na porta:3000`)
    })
  })
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err.message)
    process.exit(1)
  })
