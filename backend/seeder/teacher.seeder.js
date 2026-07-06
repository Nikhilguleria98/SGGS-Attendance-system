const bcrypt = require("bcryptjs");

module.exports = async (departmentId) => [
    {
      firstName: "Rahul",
      lastName: "Sharma",
      email: "teacher1@sggs.ac.in",
      password: "Teacher@123",
      role: "teacher",
      employeeId: "T001",
      designation: "Assistant Professor",
      department: departmentId,
      isVerified: true,
    },
  ];