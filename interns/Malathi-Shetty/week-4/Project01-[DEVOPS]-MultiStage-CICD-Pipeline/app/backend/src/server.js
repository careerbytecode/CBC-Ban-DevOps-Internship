const app = require("./app");
const config = require("./config/app.config");

app.listen(config.port, () => {
    console.log(
        `${config.appName} is running on port ${config.port} (${config.nodeEnv})`
    );
});