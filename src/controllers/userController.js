/**
 * Contrôleur pour les routes utilisateurs
 * Gère les requêtes HTTP et les réponses
 */
const express = require('express');
const {
    createUser,
    getUsers,
    getUserById
} = require('../services/userService');
const { userValidation } = require('../middleware/validation');

const router = express.Router();

// POST /users - Créer un utilisateur
router.post('/', userValidation, async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            success: true,
            data: user,
            message: 'User created successfully'
        });
    } catch (error) {
        next(error);
    }
});

// GET /users - Lister tous les utilisateurs
router.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
});

// GET /users/:id - Récupérer un utilisateur par ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;