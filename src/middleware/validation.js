/**
 * Middleware de validation avec Zod
 * Valide les données d'entrée contre les schémas définis
 */
const { userSchema } = require('../schemas/userSchema');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (error) {
        const formattedErrors = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));

        res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: formattedErrors
        });
    }
};

// Middleware spécifique pour la création d'utilisateur
const userValidation = validate(userSchema);

module.exports = {
    validate,
    userValidation
};