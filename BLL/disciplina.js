const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


router.get('/horarios', (req, res) => {
    const { ra_aluno } = req.body;

    const sql = `SELECT 
                    d.nome_disciplina, 
                    d.dia_semana,
                    d.horario
                FROM 
                    disciplina d
                JOIN 
                    usuario u ON d.id_usuario = u.ra
                WHERE 
                    u.ra = ?;`;

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

router.get('/', (req, res) => {
    const { ra_aluno } = req.body;

    const sql = `SELECT 
                    d.nome_disciplina, 
                    d.dia_semana
                FROM 
                    disciplina d`;

    db.all(sql, [], (err, rows) => {  // Alterado de db.get para db.all
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



module.exports = router;