const mongoose = require("mongoose");
const User = require("./models/users");
require("dotenv").config({ path: "./.env.development" });

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Create a dummy user
  const num = Date.now().toString();
  await User.create({
    firstName: "Test",
    email: "test" + num + "@test.com",
    password: "password123",
    role: "student",
    rollNumber: "cs" + num
  });
  
  const user = await User.findOne({ rollNumber: "cs" + num });
  console.log("Found with lowercase?", user !== null);
  
  const user2 = await User.findOne({ rollNumber: "CS" + num });
  console.log("Found with uppercase?", user2 !== null);
  
  process.exit(0);
}
run();
