const bcrypt = require("bcryptjs");

module.exports = async (departmentId) => [
    {
      firstName: "Aman",
      lastName: "Singh",
      email: "student1@sggs.ac.in",
      password: "Student@123",
      role: "student",
      rollNumber: "2210990001",
      semester: 5,
      section: "A",
      batch: "2022-26",
      department: departmentId,
      isVerified: true,
    },
  ];