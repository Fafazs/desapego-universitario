const adModel = require('../models/adModel');

// Criar Anúncio (Requer Token)
const create = async (req, res) => {
  try {
    const { title, description, category, price, image_url } = req.body;
    const userId = req.user.id; // Vem lá do nosso authMiddleware!

    const newAd = await adModel.createAd(title, description, category, price, image_url, userId);
    res.status(201).json(newAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar anúncio.' });
  }
};

// Listar todos os anúncios / Vitrine Pública (Não requer Token)
const listAll = async (req, res) => {
  try {
    const category = req.query.category; // Ex: /api/ads?category=Livros
    const ads = await adModel.getAllAds(category);
    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar anúncios.' });
  }
};

// Listar anúncios do usuário logado (Requer Token)
const listMine = async (req, res) => {
  try {
    const userId = req.user.id;
    const ads = await adModel.getAdsByUser(userId);
    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar seus anúncios.' });
  }
};

// Deletar anúncio (Requer Token e ser o dono do anúncio)
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const ad = await adModel.getAdById(id);
    
    if (!ad) {
      return res.status(404).json({ error: 'Anúncio não encontrado.' });
    }

    // Verifica se o cara que tá tentando deletar é o dono do anúncio
    if (ad.user_id !== userId) {
      return res.status(403).json({ error: 'Você só pode deletar seus próprios anúncios.' });
    }

    await adModel.deleteAd(id);
    res.status(200).json({ message: 'Anúncio deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar anúncio.' });
  }
};

// Atualizar anúncio (Requer Token e ser o dono do anúncio)
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Pego do Token JWT
    const { title, description, category, price, image_url } = req.body;

    // 1. Verifica se o anúncio existe
    const ad = await adModel.getAdById(id);
    if (!ad) {
      return res.status(404).json({ error: 'Anúncio não encontrado.' });
    }

    // 2. Verifica se o usuário logado é o dono do anúncio
    if (ad.user_id !== userId) {
      return res.status(403).json({ error: 'Você só pode editar seus próprios anúncios.' });
    }

    // 3. Atualiza no banco
    const updatedAd = await adModel.updateAd(id, title, description, category, price, image_url);
    res.status(200).json(updatedAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar anúncio.' });
  }
};

module.exports = { create, listAll, listMine, remove, update };