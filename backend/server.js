require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Inicializa a conexão com o banco
require('./src/config/db'); 

const app = express();

app.use(cors());
app.use(express.json());

// Importa as rotas de autenticação
const authRoutes = require('./src/routes/authRoutes');

// Usa as rotas (Prefixo padrão: /api/auth)
app.use('/auth', authRoutes);

// Importa as rotas de anúncios
const adRoutes = require('./src/routes/adRoutes');
app.use('/ads', adRoutes);

// Em breve, nossas rotas entrarão aqui!
app.get('/', (req, res) => {
  res.json({ message: 'API MVC do Desapego Universitário rodando! 🚀' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});