const bcrypt = require("bcryptjs");

module.exports = async (departmentId) => ({
  firstName: "Head",
  lastName: "Department",
  email: "hod@gmail.com",
  password: "Hod@1234",   // pre-save hook will hash it
  role: "hod",
  employeeId: "HOD001",
  designation: "Head of Department",
  department: departmentId,
  isVerified: true,
});