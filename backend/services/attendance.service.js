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
}

module.exports = new AttendanceService();