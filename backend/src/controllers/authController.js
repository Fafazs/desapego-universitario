const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Rota de Cadastro (Register)
const register = async (req, res) => {
    try {
        const { name, email, password, whatsapp, course } = req.body;

        // 1. Verifica se o usuário já existe
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Este e-mail já está em uso.' });
        }

        // 2. Criptografa a senha (RF-SE01)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Salva no banco
        const newUser = await userModel.createUser(name, email, passwordHash, whatsapp, course);

        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Rota de Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Busca o usuário
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 2. Compara a senha enviada com o Hash salvo
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 3. Gera o Token JWT (RF-SE02)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            user: { id: user.id, name: user.name, email: user.email, course: user.course }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    register,
    login
};