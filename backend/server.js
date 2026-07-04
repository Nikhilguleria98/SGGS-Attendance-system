require("./config/env");

const app = require("./app");
const connectDB = require("./config/database");

connectDB();

const env = require("./config/env");

app.listen(env.port, () => {
    console.log(`Running in ${env.env} mode`);
    console.log(`Server is running at http://localhost:${env.port}`);
});
