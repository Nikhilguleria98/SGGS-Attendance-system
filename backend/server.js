require("./config/env");

const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const env = require("./config/env");

app.listen(port , () => {
    console.log(`Running in ${env.env} mode`);
    console.log(`Server is running at http://localhost:${port}`);
});
