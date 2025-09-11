const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("--------------------------------");
    console.log("Tempo:", new Date().toLocaleString());
    console.log("Método:", req.method);
    console.log("URL:", req.url);
    next();
});

app.get('/nome', (req, res, next) => {
    const primeiroNome = req.body.primeiroNome;
    const sobreNome = req.body.sobreNome;

    res.send("Olá " + primeiroNome + " " + sobreNome + "!");

});





app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});