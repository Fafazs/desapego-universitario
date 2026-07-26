const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas Públicas
router.get('/', adController.listAll);

// Rotas Privadas (repare no authMiddleware no meio delas)
router.get('/me', authMiddleware, adController.listMine);
router.post('/', authMiddleware, adController.create);
router.delete('/:id', authMiddleware, adController.remove);
router.put('/:id', authMiddleware, adController.update);

module.exports = router;