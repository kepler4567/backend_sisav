const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuario(
ra INT PRIMARY KEY NOT NULL,
nome TEXT NOT NULL,
email TEXT NOT NULL,
senha TEXT NOT NULL,
foto_perfil INT,
tipo_usuario INT
);

CREATE TABLE IF NOT EXISTS solicitacao (
id_solicitacao INT PRIMARY KEY NOT NULL,
tipo_solicitacao TEXT NOT NULL,
data_criacao DATE NOT NULL,
status INT NOT NULL,
ra INT NOT NULL,
FOREIGN KEY (ra) REFERENCES usuario (ra)
);

CREATE TABLE IF NOT EXISTS consulta (
id_consulta INT PRIMARY KEY NOT NULL,
tipo_consulta TEXT NOT NULL,
data_consulta DATE NOT NULL,
ra INT NOT NULL,
FOREIGN KEY (ra) REFERENCES usuario (ra)
);

CREATE TABLE IF NOT EXISTS documento (
id_documento INT PRIMARY KEY NOT NULL,
tipo_documento TEXT NOT NULL,
data_upload DATE NOT NULL,
caminho_arquivo TEXT NOT NULL,
ra INT NOT NULL,
FOREIGN KEY (ra) REFERENCES usuario (ra)
);

CREATE TABLE IF NOT EXISTS historico_academico (
id_historico INT PRIMARY KEY NOT NULL,
notas INT NOT NULL,
faltas INT NOT NULL,
ra INT NOT NULL,
FOREIGN KEY (ra) REFERENCES usuario (ra)
);

CREATE TABLE IF NOT EXISTS departamento (
id_departamento INT PRIMARY KEY NOT NULL,
nome_departamento TEXT NOT NULL,
chefe_departamento TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS curso (
id_curso INT PRIMARY KEY NOT NULL,
nome_curso TEXT NOT NULL,
descricao TEXT NOT NULL,
id_departamento INT NOT NULL,
ra INT NOT NULL,
FOREIGN KEY (id_departamento) REFERENCES departamento (id_departamento),
FOREIGN KEY (ra) REFERENCES usuario (ra)
);

CREATE TABLE IF NOT EXISTS professor (
nome_professor TEXT NOT NULL,
id_professor INT PRIMARY KEY NOT NULL,
titulacao TEXT NOT NULL,
id_departamento INT NOT NULL,
FOREIGN KEY (id_departamento) REFERENCES departamento (id_departamento)
);

CREATE TABLE IF NOT EXISTS disciplina (
id_disciplina INT PRIMARY KEY NOT NULL,
nome_disciplina TEXT NOT NULL,
carga_horaria INT NOT NULL,
id_curso INT NOT NULL,
id_professor INT NOT NULL,
id_departamento INT NOT NULL,
FOREIGN KEY (id_curso) REFERENCES curso (id_curso),
FOREIGN KEY (id_professor) REFERENCES professor (id_professor),
FOREIGN KEY (id_departamento) REFERENCES departamento (id_departamento)
);

CREATE TABLE IF NOT EXISTS materia_didatico (
id_materia INT PRIMARY KEY NOT NULL,
tipo_material TEXT NOT NULL,
titulo TEXT NOT NULL,
link_material TEXT NOT NULL,
id_disciplina INT NOT NULL,
FOREIGN KEY (id_disciplina) REFERENCES disciplina (id_disciplina)
);

CREATE TABLE IF NOT EXISTS avaliacao (
id_avaliacao INT PRIMARY KEY NOT NULL,
tipo_avaliacao TEXT NOT NULL,
data_avaliacao DATE NOT NULL,
id_disciplina INT NOT NULL,
ra INT NOT NULL,
FOREIGN KEY (id_disciplina) REFERENCES disciplina (id_disciplina),
FOREIGN KEY (ra) REFERENCES usuario (ra)
);
`);


});

db.close();
