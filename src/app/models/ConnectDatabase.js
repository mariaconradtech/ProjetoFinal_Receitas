const mysql = require("mysql2/promise");


const client = mysql.createPool({
  host: "localhost",
  port: 3307, // Porta configurada para o MariaDB -- trocar caso necessário para o padrão 3306
  user: "root", // Usuário do MariaDB
  password: "7856", // Senha do MariaDB
  database: "receita_trabalho_final_devweb", // Nome do banco de dados
});

const testConnection = async () => {
  try {
    const connection = await client.getConnection();
    console.log("Banco de dados conectado com sucesso!");
    connection.release(); 
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};


exports.query = async (_query, values) => {
  try {
    const [rows, fields] = await client.execute(_query, values);
    return rows; 
  } catch (error) {
    console.error("Erro ao executar query:", error);
    throw error;
  }
};

exports.testConnection = testConnection;
