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
          horario INT NOT NULL,
          id_usuario INT,
          situacao TEXT,
          faltas INT,
          media INT,
          FOREIGN KEY (id_usuario) REFERENCES usuario(ra)  -- Adiciona a chave estrangeira
      );`);

      db.run(`CREATE TABLE IF NOT EXISTS AAC (
            id_aac INT PRIMARY KEY NOT NULL,
            nome TEXT NOT NULL,
            horas INT NOT NULL,
            ano INT NOT NULL,
            status TEXT NOT NULL,
            ra_aluno INT,
            FOREIGN KEY (ra_aluno) REFERENCES usuario(ra)
        );`);

  
      // Inserindo dados na tabela usuario
      db.run(`INSERT INTO usuario (ra, nome, email, senha) VALUES 
          (101, 'João Silva', 'joao.silva@email.com', 'senha123'),
          (102, 'Maria Oliveira', 'maria.oliveira@email.com', 'senha456'),
          (103, 'Carlos Souza', 'carlos.souza@email.com', 'senha789'),
          (104, 'Ana Costa', 'ana.costa@email.com', 'senha101112');`);
  
      // Inserindo dados na tabela disciplina
      db.run(`INSERT INTO disciplina (id_disciplina, nome_disciplina, dia_semana, horario, id_usuario, situacao, faltas, media) VALUES 
          (201, 'Matemática', 'Segunda-feira', 1, 101, 'reprovado', 3, 50),
          (202, 'História', 'Terça-feira',2, 101, 'aprovado', 5, 70),
          (203, 'Geografia', 'Quarta-feira',2, 101, 'em andamento', 4, null),
          (204, 'Química', 'Quinta-feira',2, 101, 'aprovado', 1, 66),
          (205, 'Física', 'Sexta-feira',2, 101, 'aprovado', 2, 80),
          (206, 'Biologia', 'Segunda-feira',2, 101, 'em andamento', 4, null),
          (207, 'Inglês', 'Quarta-feira',1, 101, 'aprovado', 2, 70),
          (208, 'Educação Física', 'Sexta-feira',1, 101, 'reprovado', 1, 44);`);

    db.run(`INSERT INTO AAC (id_aac, nome, horas, ano, status, ra_aluno) VALUES 
    (301, 'Projeto de Extensão', 30, 2023, 'Concluído', 101),
    (302, 'Curso de Verão', 20, 2024, 'Pendente', 101),
    (303, 'Voluntariado', 40, 2023, 'Concluído', 102),
    (304, 'Participação em Congresso', 10, 2024, 'Pendente', 103),
    (305, 'Oficina de Capacitação', 15, 2023, 'Concluído', 104);`);
});
  
  db.close();

});

db.close();
