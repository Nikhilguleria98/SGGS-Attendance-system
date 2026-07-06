const hodSeeder = async (departmentId) => {
  return {
    firstName: "Head",
    lastName: "Department",
    email: "hod@gmail.com",
    password: "hod@1234",
    role: "hod",
    employeeId: "HOD001",
    designation: "Head of Department",
    department: departmentId,
    isVerified: true,
  };
};

module.exports = hodSeeder;