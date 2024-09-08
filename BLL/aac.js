const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


router.get('/:ra_aluno', (req, res) => {
    const { ra_aluno } = req.params;

    const sql = `SELECT 
                    a.nome,
                    a.horas,
                    a.ano, 
                    a.status
                FROM 
                    aac a
                JOIN 
                    usuario u ON a.ra_aluno = u.ra
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




module.exports = router;