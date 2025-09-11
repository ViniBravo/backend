const express = require('express');

const app = express();
const porta = 3000;

app.listen(porta, () => {
    console.log("Aplicação rodando em http://localhost:3000");
}); 

app.get('/', (req, res, next) => {
    res.send('Hello World!');
}); 