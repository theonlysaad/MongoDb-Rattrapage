/**
 * Utilities de connexion aux bases de données - Version simplifiée
 */
const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        console.log('🔗 Connecting to MongoDB...');

        await mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB successfully');

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });

    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        // Ne pas arrêter l'application immédiatement
        console.log('⚠️ Continuing without MongoDB...');
    }
};

module.exports = {
    connectMongo
};