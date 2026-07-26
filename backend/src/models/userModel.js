const db = require('../config/db');

// Cria um novo usuário no banco
const createUser = async (name, email, passwordHash, whatsapp, course) => {
  const query = `
    INSERT INTO users (name, email, password_hash, whatsapp, course) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, name, email, whatsapp, course, created_at
  `;
  const values = [name, email, passwordHash, whatsapp, course];
  
  const result = await db.query(query, values);
  return result.rows[0];
};

// Busca um usuário pelo email (usado no login e validação)
const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail
};