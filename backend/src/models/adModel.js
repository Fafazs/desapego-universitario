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

const getAllAds = async (filters) => {
  const { category, course, search, priceRange, sortBy, limit, offset } = filters;

  let query = `
    SELECT ads.*, 
           users.name AS seller_name, 
           users.whatsapp AS seller_whatsapp,
           users.course AS user_course
    FROM ads
    JOIN users ON ads.user_id = users.id
    WHERE 1=1
  `;
  const values = [];
  let valueCount = 1;

  // --- FILTROS INTELIGENTES ---
  if (category && category !== 'Todos') { // Corrigido de 'Tudo' para 'Todos'
    query += ` AND ads.category = $${valueCount}`;
    values.push(category);
    valueCount++;
  }

  if (course && course !== 'Todos') {
    query += ` AND users.course = $${valueCount}`;
    values.push(course);
    valueCount++;
  }

  if (search) {
    query += ` AND (ads.title ILIKE $${valueCount} OR ads.description ILIKE $${valueCount})`;
    values.push(`%${search}%`);
    valueCount++;
  }

  if (priceRange) {
    if (priceRange === 'Doação') {
      query += ` AND ads.price = 0`;
    } else if (priceRange === 'Até R$ 50') {
      query += ` AND ads.price > 0 AND ads.price <= 50`;
    } else if (priceRange === 'Até R$ 100') {
      query += ` AND ads.price > 0 AND ads.price <= 100`;
    } else if (priceRange === 'Até R$ 200') {
      query += ` AND ads.price > 0 AND ads.price <= 200`;
    }
  }

  // --- ORDENAÇÃO ---
  if (sortBy === 'Mais Antigos') {
    query += ` ORDER BY ads.created_at ASC`;
  } else if (sortBy === 'Menor Preço') {
    query += ` ORDER BY ads.price ASC`;
  } else if (sortBy === 'Maior Preço') {
    query += ` ORDER BY ads.price DESC`;
  } else {
    query += ` ORDER BY ads.created_at DESC`;
  }

  // --- PAGINAÇÃO ---
  if (limit) {
    query += ` LIMIT $${valueCount}`;
    values.push(parseInt(limit));
    valueCount++;
  }
  
  if (offset) {
    query += ` OFFSET $${valueCount}`;
    values.push(parseInt(offset));
    valueCount++;
  }

  const result = await db.query(query, values);
  return result.rows;
};

// 👇 A MÁGICA ACONTECE AQUI 👇
const getAdsByUser = async (userId, filters) => {
  // Garantimos que 'filters' será um objeto vazio caso nada seja passado
  const { category, course, search, priceRange, sortBy, limit, offset } = filters || {};

  let query = `
    SELECT ads.*, 
           users.name AS seller_name, 
           users.whatsapp AS seller_whatsapp,
           users.course AS user_course
    FROM ads
    JOIN users ON ads.user_id = users.id
    WHERE ads.user_id = $1 
  `;
  
  const values = [userId];
  let valueCount = 2; // Começa no 2, porque o $1 já é o userId!

  if (category && category !== 'Todos') {
    query += ` AND ads.category = $${valueCount}`;
    values.push(category);
    valueCount++;
  }

  if (course && course !== 'Todos') {
    query += ` AND users.course = $${valueCount}`;
    values.push(course);
    valueCount++;
  }

  if (search) {
    query += ` AND (ads.title ILIKE $${valueCount} OR ads.description ILIKE $${valueCount})`;
    values.push(`%${search}%`);
    valueCount++;
  }

  if (priceRange) {
    if (priceRange === 'Doação') {
      query += ` AND ads.price = 0`;
    } else if (priceRange === 'Até R$ 50') {
      query += ` AND ads.price > 0 AND ads.price <= 50`;
    } else if (priceRange === 'Até R$ 100') {
      query += ` AND ads.price > 0 AND ads.price <= 100`;
    } else if (priceRange === 'Até R$ 200') {
      query += ` AND ads.price > 0 AND ads.price <= 200`;
    }
  }

  if (sortBy === 'Mais Antigos') {
    query += ` ORDER BY ads.created_at ASC`;
  } else if (sortBy === 'Menor Preço') {
    query += ` ORDER BY ads.price ASC`;
  } else if (sortBy === 'Maior Preço') {
    query += ` ORDER BY ads.price DESC`;
  } else {
    query += ` ORDER BY ads.created_at DESC`;
  }

  if (limit) {
    query += ` LIMIT $${valueCount}`;
    values.push(parseInt(limit));
    valueCount++;
  }
  
  if (offset) {
    query += ` OFFSET $${valueCount}`;
    values.push(parseInt(offset));
    valueCount++;
  }

  const result = await db.query(query, values);
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
    SET title = $1, 
        description = $2, 
        category = $3, 
        price = $4, 
        image_url = COALESCE($5, image_url) 
    WHERE id = $6 
    RETURNING *
  `;
  
  const values = [title, description, category, price, imageUrl || null, id];
  const result = await db.query(query, values);
  
  // CORREÇÃO: A trava de segurança!
  if (result.rowCount === 0) {
    throw new Error("Anúncio não encontrado ou ID inválido no banco de dados.");
  }
  
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