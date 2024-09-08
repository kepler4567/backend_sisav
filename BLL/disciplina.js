const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


router.get('/horarios/:ra_aluno', (req, res) => {
    const { ra_aluno } = req.params;


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

router.get('/media/:ra_aluno', (req, res) => {
    const { ra_aluno } = req.params;


    const sql = `SELECT 
                    d.id_disciplina, 
                    d.situacao,
                    d.faltas,
                    d.media,
                    d.nome_disciplina
                FROM 
                    disciplina d
                JOIN 
                    usuario u ON d.id_usuario = u.ra
                WHERE 
                    u.ra = ?;`;

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

router.get('/historico/:ra_aluno', (req, res) => {
    const { ra_aluno } = req.params;


    const sql = `SELECT 
                    d.id_disciplina, 
                    d.situacao,
                    d.faltas,
                    d.media,
                    d.nome_disciplina,
                    d.serie,
                    d.carga
                FROM 
                    disciplina d
                JOIN 
                    usuario u ON d.id_usuario = u.ra
                WHERE 
                    u.ra = ?;`;

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





router.get('/', (req, res) => {
    const { ra_aluno } = req.body;

    const sql = `SELECT 
                    d.nome_disciplina, 
                    d.dia_semana
                FROM 
                    disciplina d`;

    db.all(sql, [], (err, rows) => {  
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



module.exports = router;