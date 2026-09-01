const bcrypt = require("bcryptjs");

module.exports = async (departmentId, semesterMap) => [
    {
      firstName: "Aman",
      lastName: "Singh",
      email: "student1@sggs.ac.in",
      password: "student@123",
      role: "student",
      rollNumber: "2210990001",
      semester: semesterMap[5],
      section: "A",
      batch: "2022-26",
      department: departmentId,
      isVerified: true,
    },
  ];