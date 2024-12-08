DROP DATABASE IF EXISTS receita_trabalho_final_devweb;
CREATE DATABASE receita_trabalho_final_devweb;
USE receita_trabalho_final_devweb;

CREATE TABLE Receita (
    nome VARCHAR(100) PRIMARY KEY,
    ingrediente TEXT NOT NULL,
    preparo TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
