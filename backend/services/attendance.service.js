const attendanceRepository = require("../repositories/attendance.repository");
const attendanceSummaryRepository = require("../repositories/attendanceSummary.repository");
const ApiError = require("../utils/ApiError");

class AttendanceService {
    // ─────────────────────────────────────────────────────────────────────────
    // Summary synchronization — single entry point for all summary updates
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Increment or decrement the AttendanceSummary counters for a
     * (assignment, student) pair based on the attendance status.
     *
     * Rules:
     *  - "holiday"              → no-op (holidays never touch counters)
     *  - "present"|"medical"|"duty" → classesDelivered ±1, classesAttended ±1
     *  - "absent"               → classesDelivered ±1, classesAbsent ±1
     *
     * @param {string|ObjectId} assignmentId
     * @param {string|ObjectId} studentId
     * @param {string}          status    Attendance status value
     * @param {boolean}         increment true → add, false → subtract
     */
    async updateSummary(assignmentId, studentId, status, increment) {
        if (status === "holiday") return; // Holidays do not affect counters

        const sign = increment ? 1 : -1;
        const delta = { classesDelivered: sign };

        if (["present", "medical", "duty"].includes(status)) {
            delta.classesAttended = sign;
        } else if (status === "absent") {
            delta.classesAbsent = sign;
        }

        // Single atomic round-trip — creates the document if it does not exist
        return await attendanceSummaryRepository.upsertSummary(assignmentId, studentId, delta);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Attendance CRUD
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Mark attendance for a student.
     *
     * Flow:
     *   1. Guard against duplicate (same assignment + student + date) → 409
     *   2. Create Attendance record
     *   3. Increment AttendanceSummary counters
     *   4. Return fully-populated Attendance document
     */
    async markAttendance(data) {
        const existing = await attendanceRepository.findOne({
            assignment: data.assignment,
            student: data.student,
            attendanceDate: data.attendanceDate,
        });

        if (existing) {
            throw new ApiError(409, "Attendance already marked for this student on this date");
        }

        // create() now returns a fully-populated document
        const attendance = await attendanceRepository.create(data);

        // Use the raw IDs from the incoming data — avoids ObjectId vs populated-object
        // ambiguity since data always contains plain IDs at this point
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

    /**
     * Update an existing Attendance record and keep the summary synchronized.
     *
     * Flow:
     *   1. Fetch existing record → 404 if missing
     *   2. Extract assignment/student IDs from the populated document upfront
     *   3. Rollback summary counters for the OLD status
     *   4. Persist the update
     *   5. Apply summary counters for the NEW status
     *   6. Return the fully-populated updated document
     *
     * Note: assignment and student are immutable on an attendance record.
     * Only status, attendanceDate, and remarks may change.
     * IDs are therefore read once from `existing` and reused for both steps.
     *
     * Future-proofing: steps 3-5 are isolated sequential awaits so a
     * MongoDB session can be injected at each call without changing this logic.
     */
    async updateAttendance(id, data) {
        const existing = await attendanceRepository.findById(id);
        if (!existing) {
            throw new ApiError(404, "Attendance record not found");
        }

        // Resolve IDs once from the populated document.
        // assignment and student are always populated objects here (Phase 1 + 2
        // guarantee every repository read returns populated docs), but we use
        // optional chaining as a defensive fallback.
        const assignmentId = existing.assignment?._id ?? existing.assignment;
        const studentId = existing.student?._id ?? existing.student;

        // Step 1: rollback the summary effect of the old status
        await this.updateSummary(assignmentId, studentId, existing.status, false);

        // Step 2: persist the change
        const attendance = await attendanceRepository.updateById(id, data);

        // Step 3: apply the summary effect of the new status
        await this.updateSummary(assignmentId, studentId, attendance.status, true);

        return attendance;
    }

    /**
     * Delete an Attendance record and rollback its summary contribution.
     *
     * Flow:
     *   1. Fetch existing record → 404 if missing
     *   2. Rollback summary counters
     *   3. Delete the record
     *
     * The rollback must happen before the delete so we have the status
     * available if deletion fails mid-flight.
     */
    async deleteAttendance(id) {
        const existing = await attendanceRepository.findById(id);
        if (!existing) {
            throw new ApiError(404, "Attendance record not found");
        }

        const assignmentId = existing.assignment?._id ?? existing.assignment;
        const studentId = existing.student?._id ?? existing.student;

        // Rollback before delete so the status is still available on failure
        await this.updateSummary(assignmentId, studentId, existing.status, false);

        return await attendanceRepository.deleteById(id);
    }
}

module.exports = new AttendanceService();