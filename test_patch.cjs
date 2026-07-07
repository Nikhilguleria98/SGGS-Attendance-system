const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env.development' });
const User = require('./backend/models/users');
const jwt = require('jsonwebtoken');

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  const hod = await User.findOne({ role: 'hod' });
  
  if (!hod) {
    console.log("HOD not found!");
    process.exit(1);
  }
  
  console.log("HOD found, ID:", hod._id.toString());
  
  // Generate token
  const token = jwt.sign({ id: hod._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
  const student = await User.findOne({ role: 'student' });
  
  // Test PATCH /users/:id
  const response = await fetch(`http://localhost:5000/api/users/${student._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ firstName: 'Updated' })
  });
  
  const data = await response.json();
  console.log("Response:", data);
  
  process.exit(0);
}
test();
