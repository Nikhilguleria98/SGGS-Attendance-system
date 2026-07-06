require("../config/env");
console.log(process.env.MONGO_URI);
const Department = require("../models/Department");
const User = require("../models/users");
const Subject = require("../models/Subject");
const connectDB = require("../config/database");
const departmentSeeder = require("./department.seeder");
const hodSeeder = require("./hod.seeder");
const teacherSeeder = require("./teacher.seeder");
const studentSeeder = require("./student.seeder");
const subjectSeeder = require("./subject.seeder");

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Department.deleteMany({});
    await Subject.deleteMany({});

    const cseDepartment = await departmentSeeder();

    const hod = await hodSeeder(cseDepartment._id);
    const teachers = await teacherSeeder(cseDepartment._id);
    const students = await studentSeeder(cseDepartment._id);

    const createdHod = await User.create(hod);
    await User.create(teachers);
    await User.create(students);

    const subjects = await subjectSeeder(cseDepartment._id, createdHod._id);
    await Subject.create(subjects);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();