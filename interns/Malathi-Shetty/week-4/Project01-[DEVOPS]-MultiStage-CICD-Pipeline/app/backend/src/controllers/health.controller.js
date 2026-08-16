const healthService = require("../services/health.service");

function getHealth(req, res) {
    console.log("Controller reached");

    const health = healthService.getHealthStatus();

    console.log("Sending response");

    res.status(200).json(health);
}

module.exports = {
    getHealth
};