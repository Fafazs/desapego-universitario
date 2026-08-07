const adModel = require('../models/adModel');
const { createClient } = require('@supabase/supabase-js');

// 1. URL fixa (pública) + Chave de serviço tratada sem aspas ou espaços
const supabaseUrl = 'https://qievrwijriooubpnllzn.supabase.co';
const supabaseKey = (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '').replace(/['"\s]/g, '');

// 2. Inicialização 100% garantida
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. CRIAR ANÚNCIO (Com upload real no Supabase)
const create = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const userId = req.user.id;
    let imageUrl = null;

    if (req.file) {
      const file = req.file;
      const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    } else {
      imageUrl = req.body.image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500';
    }

    const newAd = await adModel.createAd(title, description, category, price, imageUrl, userId);
    res.status(201).json(newAd);
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ error: 'Erro ao criar anúncio com imagem.' });
  }
};

// 2. LISTAR TODOS
const listAll = async (req, res) => {
  try {
    // Extrai tudo que vem na URL (Query Params)
    const filters = {
      category: req.query.category,
      course: req.query.course,
      search: req.query.search,
      priceRange: req.query.priceRange,
      sortBy: req.query.sortBy,
      limit: req.query.limit || 9, // Traz 9 por vez como padrão
      offset: req.query.offset || 0  // Pula 0 por padrão (página 1)
    };
    
    // Passa o objeto inteiro de filtros para o model
    const ads = await adModel.getAllAds(filters); 
    res.status(200).json(ads);
  } catch (error) {
    console.error('Erro ao listar todos com filtros:', error);
    res.status(500).json({ error: 'Erro ao buscar anúncios avançados.' });
  }
};

// 3. LISTAR MEUS ANÚNCIOS
const listMine = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // 👇 ADICIONADO: Extração dos mesmos filtros utilizados na listAll 👇
    const filters = {
      category: req.query.category,
      course: req.query.course,
      search: req.query.search,
      priceRange: req.query.priceRange,
      sortBy: req.query.sortBy,
      limit: req.query.limit || 9,
      offset: req.query.offset || 0
    };

    // 👇 ADICIONADO: Passando os filtros como segundo argumento 👇
    const ads = await adModel.getAdsByUser(userId, filters); 
    res.status(200).json(ads);
  } catch (error) {
    console.error('Erro ao listar meus anúncios:', error);
    res.status(500).json({ error: 'Erro ao buscar seus anúncios.' });
  }
};

// 4. ATUALIZAR ANÚNCIO (Com suporte para trocar a foto)
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, price } = req.body;
    let imageUrl = req.body.image_url; 

    if (req.file) {
      const file = req.file;
      const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

      const { data, error } = await supabase.storage
        .from('ads')
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from('ads').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    const updatedAd = await adModel.updateAd(id, title, description, category, price, imageUrl);
    res.status(200).json(updatedAd);
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    res.status(500).json({ error: 'Erro ao atualizar anúncio.' });
  }
};

// 5. DELETAR ANÚNCIO
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await adModel.deleteAd(id); 
    res.status(200).json({ message: 'Anúncio removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover:', error);
    res.status(500).json({ error: 'Erro ao remover anúncio.' });
  }
};

module.exports = {
  create,
  listAll,
  listMine,
  update,
  remove
};