const express = require('express')

const app = express()


app.use((req, res, next) => {
  console.log("-------------####-------------")
  console.log("Tempo: ", new Date().toLocaleString())
  console.log("Metodo: ", req.method)
  console.log("Rota: ", req.url)
  next()
})


const calculadoraNotaRouter = require('./routes/Calculadora')
app.use('/calculadora', calculadoraNotaRouter)


/
app.listen(3000, () => {
  console.log("Aplicação rodando em http://localhost:3000")
})