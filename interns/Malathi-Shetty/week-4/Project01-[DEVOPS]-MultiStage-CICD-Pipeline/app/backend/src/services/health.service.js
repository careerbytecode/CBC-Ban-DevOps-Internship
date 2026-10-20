const config = require("../config/app.config");

function getHealthStatus() {
    return {
        status: "UP",
        application: config.appName,
        version: config.appVersion,
        build: config.buildVersion,
        environment: config.nodeEnv,
        port: config.port,
        corsOrigin: config.corsOrigin,
        timestamp: new Date().toISOString(),
    };
}

module.exports = {
    getHealthStatus,
};