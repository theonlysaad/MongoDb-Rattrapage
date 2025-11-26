/**
 * Middleware global de gestion des erreurs
 * Capture et formate toutes les erreurs de l'application
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Erreur de validation Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message
        }));

        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: errors
        });
    }

    // Erreur de duplication MongoDB
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            success: false,
            error: 'Duplicate Entry',
            message: `${field} already exists`
        });
    }

    // Erreur Cast (ID invalide)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID',
            message: 'The provided ID is invalid'
        });
    }

    // Erreur personnalisée
    if (err.message) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request',
            message: err.message
        });
    }

    // Erreur serveur par défaut
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

module.exports = errorHandler;