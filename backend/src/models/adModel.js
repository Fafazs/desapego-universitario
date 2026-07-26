const db = require('../config/db');

const createAd = async (title, description, category, price, imageUrl, userId) => {
  const query = `
    INSERT INTO ads (title, description, category, price, image_url, user_id) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;
  const values = [title, description, category, price, imageUrl, userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getAllAds = async (category) => {
  // Busca anúncios e junta com o nome e whatsapp do dono
  let query = `
    SELECT ads.*, users.name AS seller_name, users.whatsapp AS seller_whatsapp 
    FROM ads 
    JOIN users ON ads.user_id = users.id
  `;
  const values = [];

  // Se o usuário clicou num filtro, adiciona a regra na busca
  if (category) {
    query += ` WHERE ads.category = $1`;
    values.push(category);
  }

  query += ` ORDER BY ads.created_at DESC`; // Mais recentes primeiro

  const result = await db.query(query, values);
  return result.rows;
};

const getAdsByUser = async (userId) => {
  const result = await db.query('SELECT * FROM ads WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

const getAdById = async (id) => {
  const result = await db.query('SELECT * FROM ads WHERE id = $1', [id]);
  return result.rows[0];
};

const deleteAd = async (id) => {
  await db.query('DELETE FROM ads WHERE id = $1', [id]);
};

const updateAd = async (id, title, description, category, price, imageUrl) => {
  const query = `
    UPDATE ads 
    SET title = $1, description = $2, category = $3, price = $4, image_url = $5 
    WHERE id = $6 
    RETURNING *
  `;
  const values = [title, description, category, price, imageUrl, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  createAd,
  getAllAds,
  getAdsByUser,
  getAdById,
  deleteAd,
  updateAd
};