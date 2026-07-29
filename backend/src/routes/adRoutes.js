const express = require('express');
const router = express.Router();
const multer = require('multer');
const adController = require('../controllers/adController');
const authMiddleware = require('../middlewares/authMiddleware');

// Configura o Multer para guardar o arquivo na memória temporária do Node
const upload = multer({ storage: multer.memoryStorage() });

// Rota para listar todos (o frontend já filtra os do usuário)
router.get('/', adController.listAll);

// Rotas de criação, exclusão e atualização (com suporte a imagem)
router.post('/', authMiddleware, upload.single('image'), adController.create);
router.delete('/:id', authMiddleware, adController.remove);
router.put('/:id', authMiddleware, upload.single('image'), adController.update);

module.exports = router;