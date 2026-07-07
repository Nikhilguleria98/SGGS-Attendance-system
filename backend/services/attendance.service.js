const attendanceRepository = require("../repositories/attendance.repository");
const ApiError = require("../utils/ApiError");

class AttendanceService {
    async markAttendance(data) {
        return await attendanceRepository.create(data);
    }

    async getAllAttendance() {
        return await attendanceRepository.findAll();
    }

    async getAttendanceById(id) {
        const attendance = await attendanceRepository.findById(id);

        if (!attendance) {
            throw new ApiError(404, "Attendance record not found");
        }

        return attendance;
    }

    async updateAttendance(id, data) {
        const attendance = await attendanceRepository.updateById(id, data);

        if (!attendance) {
            throw new ApiError(404, "Attendance record not found");
        }

        return attendance;
    }

    async deleteAttendance(id) {
        const attendance = await attendanceRepository.deleteById(id);

        if (!attendance) {
            throw new ApiError(404, "Attendance record not found");
        }

        return attendance;
    }
async getStudentAttendanceReport() {
    const records = await attendanceRepository.findAllForReport();

    const grouped = {};

    for (const record of records) {
        if (!record.student || !record.subject) continue;
        if (record.status === "holiday") continue;

        const key = `${record.student._id}_${record.subject._id}`;

        if (!grouped[key]) {
            grouped[key] = {
                _id: key,
                studentName: `${record.student.firstName} ${record.student.lastName || ""}`.trim(),
                rollNo: record.student.rollNumber,
                department: record.student.department?.name || "",
                batch: record.student.batch || "",
                section: record.student.section || "",
                subject: record.subject.name,
                present: 0,
                totalClasses: 0,
            };
        }

        grouped[key].totalClasses += 1;
        if (record.status === "present") {
            grouped[key].present += 1;
        }
    }

    return Object.values(grouped);
}

}

module.exports = new AttendanceService();