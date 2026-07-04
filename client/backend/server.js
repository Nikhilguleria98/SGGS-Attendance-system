require("./config/env");

const app = require("./app");
const connectDB = require("./config/database");

connectDB();

const env = require("./config/env");

app.listen(env.port, () => {
    console.log(`Running in ${env.env} mode`);
});