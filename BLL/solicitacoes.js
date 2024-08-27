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

    db.all(sql, [ra_aluno], (err, rows) => {  // Alterado de db.get para db.all
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (rows.length === 0) {  // Verifica se o array de resultados está vazio
            res.status(404).json({ "message": "Nenhuma disciplina encontrada para este aluno" });
            return;
        }
        res.json({
            "message": "Disciplinas encontradas",
            "data": rows  // Retorna todas as linhas encontradas
        });
    });
});


router.post('/', (req, res) => {
    const { id, nome_documento, data_criacao, solicitado_por, status, ra_aluno } = req.body;

    const sql = `INSERT INTO solicitacoes (id, nome_documento, data_criacao, solicitado_por, status, ra_aluno)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [id, nome_documento, data_criacao, solicitado_por, status, ra_aluno], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "Solicitação criada com sucesso",
            "data": {
                id: this.lastID,
                nome_documento,
                data_criacao,
                solicitado_por,
                status,
                ra_aluno
            }
        });
    });
});


module.exports = router;