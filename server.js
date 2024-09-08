const express = require('express');
const app = express();
const cors = require('cors')

const port = 3000;

app.use(cors())

app.use(express.json());

const usuarioRoutes = require('./BLL/usuario.js');
const disciplina = require('./BLL/disciplina.js');
const aac = require('./BLL/aac.js');
const documentos = require('./BLL/documentos.js');
const solicitacoes = require('./BLL/solicitacoes.js');

app.use('/usuario', usuarioRoutes);
app.use('/disciplina', disciplina);
app.use('/aac', aac);
app.use('/documentos', documentos);
app.use('/solicitacoes', solicitacoes);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});