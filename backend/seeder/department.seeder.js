// seeder/department.seeder.js

const Department = require("../models/Department");

module.exports = async () => {
  const cse = await Department.create({
    name: "Computer Science & Engineering",
    code: "CSE",
  });

  return cse;
};