const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Pega o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  // O padrão é "Bearer <token>", então separamos pelo espaço
  const token = authHeader.split(' ')[1];

  try {
    // Tenta abrir o token com a nossa senha secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Coloca o ID do usuário dentro da requisição para usarmos depois
    req.user = decoded; 
    next(); // Pode entrar! Passa para o Controller.
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;