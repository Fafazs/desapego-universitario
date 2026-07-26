const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Configura a conexão com o banco de dados (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para conexões seguras com bancos em nuvem
  }
});

// Testa a conexão ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('✅ Conectado ao PostgreSQL (Supabase) com sucesso!');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};