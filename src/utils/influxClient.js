/**
 * Client InfluxDB pour l'écriture des données
 * Gère l'envoi des points de données vers InfluxDB
 */
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Configuration du client InfluxDB
const influxDB = new InfluxDB({
    url: process.env.INFLUXDB_URL,
    token: process.env.INFLUXDB_TOKEN,
});

const writeApi = influxDB.getWriteApi(
    process.env.INFLUXDB_ORG,
    process.env.INFLUXDB_BUCKET
);

/**
 * Écrit un point de données dans InfluxDB
 * @param {Object} pointData - Données du point
 */
async function writePoint(pointData) {
    try {
        const point = new Point(pointData.measurement);

        // Ajout des tags
        Object.keys(pointData.tags || {}).forEach(key => {
            point.tag(key, pointData.tags[key]);
        });

        // Ajout des fields
        Object.keys(pointData.fields || {}).forEach(key => {
            const value = pointData.fields[key];
            if (typeof value === 'number') {
                if (Number.isInteger(value)) {
                    point.intField(key, value);
                } else {
                    point.floatField(key, value);
                }
            } else if (typeof value === 'string') {
                point.stringField(key, value);
            } else if (typeof value === 'boolean') {
                point.booleanField(key, value);
            }
        });

        // Timestamp personnalisé
        if (pointData.timestamp) {
            point.timestamp(pointData.timestamp);
        }

        writeApi.writePoint(point);

        // Flush pour s'assurer que les données sont envoyées
        await writeApi.flush();

    } catch (error) {
        console.error('Error writing to InfluxDB:', error);
        throw error;
    }
}

module.exports = {
    writePoint,
    writeApi
};