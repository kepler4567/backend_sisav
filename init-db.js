const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {

  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('database.db');
  
  db.serialize(() => {
      // Criação da tabela usuario
      db.run(`CREATE TABLE IF NOT EXISTS usuario(
          ra INT PRIMARY KEY NOT NULL,
          nome TEXT NOT NULL,
          email TEXT NOT NULL,
          senha TEXT NOT NULL
      );`);
  
      // Criação da tabela disciplina
      db.run(`CREATE TABLE IF NOT EXISTS disciplina (
          id_disciplina INT PRIMARY KEY NOT NULL,
          nome_disciplina TEXT NOT NULL,
          dia_semana TEXT NOT NULL,
          id_usuario INT,
          FOREIGN KEY (id_usuario) REFERENCES usuario(ra)  -- Adiciona a chave estrangeira
      );`);
  
      // Inserindo dados na tabela usuario
      db.run(`INSERT INTO usuario (ra, nome, email, senha) VALUES 
          (101, 'João Silva', 'joao.silva@email.com', 'senha123'),
          (102, 'Maria Oliveira', 'maria.oliveira@email.com', 'senha456'),
          (103, 'Carlos Souza', 'carlos.souza@email.com', 'senha789'),
          (104, 'Ana Costa', 'ana.costa@email.com', 'senha101112');`);
  
      // Inserindo dados na tabela disciplina
      db.run(`INSERT INTO disciplina (id_disciplina, nome_disciplina, dia_semana, id_usuario) VALUES 
          (201, 'Matemática', 'Segunda-feira', 101),
          (202, 'História', 'Terça-feira', 101),
          (203, 'Geografia', 'Quarta-feira', 102),
          (204, 'Química', 'Quinta-feira', 103),
          (205, 'Física', 'Sexta-feira', 104),
          (206, 'Biologia', 'Segunda-feira', 102),
          (207, 'Inglês', 'Quarta-feira', 103),
          (208, 'Educação Física', 'Sexta-feira', 101);`);
  });
  
  db.close();

});

db.close();
