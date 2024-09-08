const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


router.get('/:ra_aluno', (req, res) => {
    const { ra_aluno } = req.params;

    const sql = `SELECT 
                    id, nome_documento, data_criacao, solicitado_por, status, ra_aluno
                FROM 
                    solicitacoes
                WHERE 
                ra_aluno = ?;`;

    db.all(sql, [ra_aluno], (err, rows) => {  
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (rows.length === 0) {  
            res.status(404).json({ "message": "Nenhuma disciplina encontrada para este aluno" });
            return;
        }
        res.json({
            "message": "Disciplinas encontradas",
            "data": rows  
        });
    });
});


router.post('/', (req, res) => {
    const {nome_documento, ra_aluno } = req.body;
    const solicitado_por = "teste"
    const status = "Pendente"

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); 
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;



    const sql = `INSERT INTO solicitacoes (nome_documento, data_criacao, solicitado_por, status, ra_aluno)
                 VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [nome_documento, dataFormatada, solicitado_por, status, ra_aluno], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "Solicitação criada com sucesso",
            "data": {
                id: this.lastID,
                nome_documento,
                dataFormatada,
                solicitado_por,
                status,
                ra_aluno
            }
        });
    });
});


module.exports = router;