const Attendance = require("../models/Attendance");
require("../models/Subject");
require("../models/Department");

class AttendanceRepository {
    async create(data) {
        return await Attendance.create(data);
    }

    async findOne(filter) {
        return await Attendance.findOne(filter)
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    { path: "subject", select: "name code" }
                ]
            });
    }

    async findAll() {
        return await Attendance.find()
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    { path: "subject", select: "name code" }
                ]
            });
    }

    async findById(id) {
        return await Attendance.findById(id)
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    { path: "subject", select: "name code" }
                ]
            });
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