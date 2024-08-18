const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importar rotas
const usuarioRoutes = require('./BLL/usuario');

// Usar rotas
app.use('/usuario', usuarioRoutes);
// Use as outras rotas aqui...

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});