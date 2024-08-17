const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS cursos (id INTEGER PRIMARY KEY, nome TEXT, duracao INTEGER)");

    db.run("INSERT INTO alunos (nome, idade) VALUES ('João', 20), ('Maria', 22), ('Ana', 23)");
    db.run("INSERT INTO cursos (nome, duracao) VALUES ('Matemática', 4), ('História', 3), ('Biologia', 4)");
});

db.close();
