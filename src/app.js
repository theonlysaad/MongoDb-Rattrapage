/**
 * Configuration principale d'Express - Version simplifiée
 */
const express = require('express');
const userRoutes = require('./controllers/userController');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares de base ESSENTIELS seulement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);

// Route santé
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'API Docker Node.js'
    });
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Route 404
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

module.exports = app;