require("../config/env");
console.log(process.env.MONGO_URI);
const Department = require("../models/Department");
const User = require("../models/users");
const connectDB = require("../config/database");
const departmentSeeder = require("./department.seeder");
const hodSeeder = require("./hod.seeder");
const teacherSeeder = require("./teacher.seeder");
const studentSeeder = require("./student.seeder");

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Department.deleteMany({});

    const cseDepartment = await departmentSeeder();

    const hod = await hodSeeder(cseDepartment._id);
    const teachers = await teacherSeeder(cseDepartment._id);
    const students = await studentSeeder(cseDepartment._id);

    await User.create(hod);
    await User.insertMany(teachers);
    await User.insertMany(students);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();