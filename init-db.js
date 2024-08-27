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
          senha TEXT NOT NULL,
          serie INT
      );`);

      // Criação da tabela documentos
      db.run(`CREATE TABLE IF NOT EXISTS documentos(
        ra INT,
        nome TEXT NOT NULL,
        numero INT,
        FOREIGN KEY (ra) REFERENCES usuario(ra)
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
          serie INT,
          carga INT,
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

        db.run(`CREATE TABLE IF NOT EXISTS solicitacoes (
          id INT PRIMARY KEY NOT NULL,
          nome_documento TEXT NOT NULL,
          data_criacao TEXT,
          solicitado_por TEXT,
          status TEXT,
          ra_aluno INT,
          FOREIGN KEY (ra_aluno) REFERENCES usuario(ra)
      );`);
          //id, nome do documento, nome de quem solicitou e data


  
      // Inserindo dados na tabela usuario
      db.run(`INSERT INTO usuario (ra, nome, email, senha, serie) VALUES 
          (101, 'João Silva', 'joao.silva@email.com', 'senha123', 4);`);
  
      // Inserindo dados na tabela disciplina
      db.run(`INSERT INTO disciplina (id_disciplina, nome_disciplina, dia_semana, horario, id_usuario, situacao, faltas, media, serie, carga) VALUES 
          (201, 'Matemática', 'Segunda-feira', 1, 101, 'reprovado', 3, 50, 1, 38),
          (202, 'História', 'Terça-feira',2, 101, 'aprovado', 5, 70, 2, 38),
          (203, 'Geografia', 'Quarta-feira',2, 101, 'em andamento', 4, null, 2, 38),
          (204, 'Química', 'Quinta-feira',2, 101, 'aprovado', 1, 66, 2, 38),
          (205, 'Física', 'Sexta-feira',2, 101, 'aprovado', 2, 80, 2, 38),
          (206, 'Biologia', 'Segunda-feira',2, 101, 'em andamento', 4, null, 2, 38),
          (207, 'Inglês', 'Quarta-feira',1, 101, 'aprovado', 2, 70, 2, 38),
          (208, 'Educação Física', 'Sexta-feira',1, 101, 'reprovado', 1, 44, 2, 38);`);

    db.run(`INSERT INTO AAC (id_aac, nome, horas, ano, status, ra_aluno) VALUES 
    (301, 'Projeto de Extensão', 30, 2023, 'Concluído', 101),
    (302, 'Curso de Verão', 20, 2024, 'Pendente', 101),
    (303, 'Voluntariado', 40, 2023, 'Concluído', 102),
    (304, 'Participação em Congresso', 10, 2024, 'Pendente', 103),
    (305, 'Oficina de Capacitação', 15, 2023, 'Concluído', 104);`);

    db.run(`INSERT INTO documentos (ra, nome, numero) VALUES 
    (101, 'Documento Identidade', 123456789),
    (101, 'Certidão de Nascimento', 987654321),
    (101, 'Passaporte', 112233445),
    (101, 'Carteira de Motorista', 556677889),
    (101, 'Carteira de Estudante', 445566778);`);


    db.run(`INSERT INTO solicitacoes (id, nome_documento, data_criacao, solicitado_por, status, ra_aluno) VALUES 
    (1, 'Histórico Escolar', '01/08/2024', 'João Silva', 'Pendente', 101),
    (2, 'Declaração de Matrícula', '10/08/2024', 'João Silva', 'Concluído', 101),
    (3, 'Atestado de Frequência', '15/08/2024', 'João Silva', 'Em Andamento', 101),
    (4, 'Certificado de Conclusão', '20/08/2024', 'João Silva', 'Pendente', 101),
    (5, 'Comprovante de Inscrição', '25/08/2024', 'João Silva', 'Concluído', 101);`);
    
});
  
  db.close();

});

db.close();
