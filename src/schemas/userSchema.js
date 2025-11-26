/**
 * Schéma de validation Zod pour les utilisateurs
 * Validation des données d'entrée avant traitement
 */
const { z } = require('zod');

const userSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

        email: z.string()
            .email('Invalid email format')
            .max(100, 'Email cannot exceed 100 characters'),

        age: z.number()
            .int('Age must be an integer')
            .min(18, 'Age must be at least 18')
            .max(120, 'Age cannot exceed 120')
    })
});

// Schéma pour la mise à jour (tous les champs optionnels)
const userUpdateSchema = userSchema.partial();

module.exports = {
    userSchema,
    userUpdateSchema
};