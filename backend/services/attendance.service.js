const attendanceRepository = require("../repositories/attendance.repository");
const attendanceSummaryRepository = require("../repositories/attendanceSummary.repository");
const ApiError = require("../utils/ApiError");

class AttendanceService {
    async updateSummary(assignmentId, studentId, status, increment) {
        if (status === "holiday") return; // Holidays don't affect counters

        let summary = await attendanceSummaryRepository.findByAssignmentAndStudent(assignmentId, studentId);
        
        if (!summary) {
            summary = await attendanceSummaryRepository.create({
                assignment: assignmentId,
                student: studentId,
                classesDelivered: 0,
                classesAttended: 0,
                classesAbsent: 0
            });
        }

        const change = increment ? 1 : -1;
        
        summary.classesDelivered += change;
        
        if (status === "present" || status === "medical" || status === "duty") {
            summary.classesAttended += change;
        } else if (status === "absent") {
            summary.classesAbsent += change;
        }
        
        await summary.save();
    }

    async markAttendance(data) {
        const existing = await attendanceRepository.findOne({
            assignment: data.assignment,
            student: data.student,
            attendanceDate: data.attendanceDate
        });

        if (existing) {
            throw new ApiError(409, "Attendance already marked for this student on this date");
        }

        const attendance = await attendanceRepository.create(data);
        await this.updateSummary(data.assignment, data.student, data.status, true);
        return attendance;
    }

    async getAllAttendance() {
        return await attendanceRepository.findAll();
    }

    async getAttendanceById(id) {
        const attendance = await attendanceRepository.findById(id);
        if (!attendance) throw new ApiError(404, "Attendance record not found");
        return attendance;
    }

    async updateAttendance(id, data) {
        const existing = await attendanceRepository.findById(id);
        if (!existing) {
            throw new ApiError(404, "Attendance record not found");
        }

        // Revert old status
        await this.updateSummary(existing.assignment._id || existing.assignment, existing.student._id || existing.student, existing.status, false);

        const attendance = await attendanceRepository.updateById(id, data);

        // Apply new status
        await this.updateSummary(attendance.assignment._id || attendance.assignment, attendance.student._id || attendance.student, attendance.status, true);

        return attendance;
    }

    async deleteAttendance(id) {
        const existing = await attendanceRepository.findById(id);
        if (!existing) {
            throw new ApiError(404, "Attendance record not found");
        }

        await this.updateSummary(existing.assignment._id || existing.assignment, existing.student._id || existing.student, existing.status, false);

        return await attendanceRepository.deleteById(id);
    }


}

module.exports = new AttendanceService();