/**
 * Service de gestion des utilisateurs
 * Logique métier et interactions avec MongoDB
 */
const User = require('../models/User');
const { logUserCreation } = require('./metricsService');

class UserService {
    /**
     * Crée un nouvel utilisateur
     * @param {Object} userData - Données de l'utilisateur
     * @returns {Promise<Object>} Utilisateur créé
     */
    async createUser(userData) {
        try {
            const user = new User(userData);
            const savedUser = await user.save();

            // Log métrique dans InfluxDB
            await logUserCreation(savedUser);

            return savedUser;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    /**
     * Récupère tous les utilisateurs
     * @returns {Promise<Array>} Liste des utilisateurs
     */
    async getUsers() {
        return User.find().select('-__v').lean();
    }

    /**
     * Récupère un utilisateur par ID
     * @param {string} id - ID MongoDB
     * @returns {Promise<Object>} Utilisateur
     */
    async getUserById(id) {
        return User.findById(id).select('-__v').lean();
    }
}

module.exports = new UserService();