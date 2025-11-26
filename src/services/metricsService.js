/**
 * Service de gestion des métriques InfluxDB
 * Logs et analytics temporels
 */
const { writePoint } = require('../utils/influxClient');

class MetricsService {
    /**
     * Log la création d'un utilisateur dans InfluxDB
     * @param {Object} user - Utilisateur créé
     */
    async logUserCreation(user) {
        const point = {
            measurement: 'user_created',
            tags: {
                user_id: user._id.toString(),
                source: 'api'
            },
            fields: {
                count: 1,
                age: user.age
            },
            timestamp: new Date()
        };

        try {
            await writePoint(point);
            console.log('📊 Metric logged: user_created');
        } catch (error) {
            console.error('Failed to log metric:', error);
            // Ne pas bloquer le flux principal en cas d'erreur métrique
        }
    }

    /**
     * Log une requête API
     * @param {string} route - Route appelée
     * @param {number} duration - Durée en ms
     * @param {number} statusCode - Code HTTP
     */
    async logApiRequest(route, duration, statusCode) {
        const point = {
            measurement: 'api_request',
            tags: {
                route,
                status_code: statusCode.toString(),
                method: 'HTTP'
            },
            fields: {
                duration,
                count: 1
            },
            timestamp: new Date()
        };

        try {
            await writePoint(point);
        } catch (error) {
            console.error('Failed to log API metric:', error);
        }
    }
}

module.exports = new MetricsService();