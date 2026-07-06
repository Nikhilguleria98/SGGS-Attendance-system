const Attendance = require("../models/Attendance");
require("../models/Subject");

class AttendanceRepository {
    async create(data) {
        return await Attendance.create(data);
    }

    async findAll() {
        return await Attendance.find()
            .populate("student", "firstName lastName rollNumber")
            .populate("teacher", "firstName lastName employeeId")
            .populate("subject", "name code");
    }

    async findById(id) {
        return await Attendance.findById(id)
            .populate("student", "firstName lastName rollNumber")
            .populate("teacher", "firstName lastName employeeId")
            .populate("subject", "name code");
    }

    async updateById(id, data) {
        return await Attendance.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async deleteById(id) {
        return await Attendance.findByIdAndDelete(id);
    }
}

module.exports = new AttendanceRepository();