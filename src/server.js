/**
 * Point d'entrée du serveur - Version robuste
 */
console.log('🚀 Starting server...');

try {
  require('dotenv').config();
  console.log('✅ Environment variables loaded');
  
  const app = require('./app');
  const { connectMongo } = require('./utils/db');

  const PORT = process.env.PORT || 3000;

  // Connexion à MongoDB seulement
  connectMongo();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Environment: ${process.env.NODE_ENV}`);
    console.log('✅ API is ready!');
  });

} catch (error) {
  console.error('❌ Server failed to start:', error);
  process.exit(1);
}