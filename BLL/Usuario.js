const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.get('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
    
    db.get(sql, [email, senha], (err, row) => {

        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!row) {
            res.status(401).json({"message": "Login falhou, usuário ou senha incorretos", "row": row});
            return;
        }
        res.json({
            "message": "Login bem-sucedido",
            "data": row
        });
    });
});

// READ - Buscar todos os usuários
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// READ - Buscar um usuário por RA
router.get('/:ra', (req, res) => {
    const { ra } = req.params;
    const sql = 'SELECT * FROM usuario WHERE ra = ?';
    db.get(sql, [ra], (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// UPDATE - Atualizar um usuário
router.put('/:ra', (req, res) => {
    const { ra } = req.params;
    const { nome, email, senha, foto_perfil, tipo_usuario } = req.body;
    const sql = `UPDATE usuario SET 
                    nome = ?, 
                    email = ?, 
                    senha = ?, 
                    foto_perfil = ?, 
                    tipo_usuario = ? 
                WHERE ra = ?`;
    db.run(sql, [nome, email, senha, foto_perfil, tipo_usuario, ra], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "changes": this.changes
        });
    });
});

// DELETE - Deletar um usuário
router.delete('/:ra', (req, res) => {
    const { ra } = req.params;
    const sql = 'DELETE FROM usuario WHERE ra = ?';
    db.run(sql, ra, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "deleted",
            "changes": this.changes
        });
    });
});

module.exports = router;
