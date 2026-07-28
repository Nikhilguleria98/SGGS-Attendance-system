const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/users");
require("dotenv").config({ path: "./.env.development" });

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ role: "student" }).select("+password");
  if (!user) { console.log("No student found"); process.exit(0); }
  console.log("User:", user.email);
  console.log("Password hash:", user.password);
  
  // Now simulate update
  const salt = await bcrypt.genSalt(12);
  const newHash = await bcrypt.hash("12345678", salt);
  console.log("New hash:", newHash);
  
  await User.findByIdAndUpdate(user._id, { password: newHash });
  
  const updatedUser = await User.findById(user._id).select("+password");
  console.log("Updated hash:", updatedUser.password);
  
  const match2 = await bcrypt.compare("12345678", updatedUser.password);
  console.log("Match again?", match2);
  
  process.exit(0);
}
run();
