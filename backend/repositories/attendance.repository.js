const Attendance = require("../models/Attendance");
require("../models/Subject");
require("../models/Department");

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

    async findAllForReport(){
        return await Attendance.find()
        .populate({
            path: "student",
            select: "firstName lastName rollNumber section batch department",
            populate: { path: "department", select: "name" },
        })
        .populate("subject", "name code");
    }
}

module.exports = new AttendanceRepository();