
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProjetoController = require('./controllers/ProjetoController');
const TarefaController = require('./controllers/TarefaController');


const app = express();
app.use(express.json());


// Conexão com MongoDB Atlas
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;
const port = PORT || 3000;


const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => {
console.error('Erro ao conectar no MongoDB:', err.message);
process.exit(1);
});


// Rotas
app.use('/departamentos', DepartamentoController);
app.use('/cargos', CargoController);
app.use('/funcionarios', FuncionarioController);
app.use('/projetos', ProjetoController);
app.use('/tarefas', TarefaController);


app.get('/', (req, res) => res.send('API api-empresas está funcionando'));


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));