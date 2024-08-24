const express = require('express');
const app = express();
const cors = require('cors')

const port = 3000;

app.use(cors())

app.use(express.json());

// Importar rotas
const usuarioRoutes = require('./BLL/usuario.js');
const disciplina = require('./BLL/disciplina.js');

// Usar rotas
app.use('/usuario', usuarioRoutes);
app.use('/disciplina', disciplina);
// Use as outras rotas aqui...

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});