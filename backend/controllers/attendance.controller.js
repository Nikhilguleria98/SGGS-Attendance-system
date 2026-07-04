const attendanceService = require("../services/attendance.service");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/response");

exports.markAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.markAttendance(
        req.validatedData.body
    );

    return success(
        res,
        201,
        "Attendance marked successfully",
        attendance
    );
});

exports.getAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getAllAttendance();

    return success(
        res,
        200,
        "Attendance fetched successfully",
        attendance
    );
});

exports.getAttendanceById = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getAttendanceById(
        req.params.id
    );

    return success(
        res,
        200,
        "Attendance fetched successfully",
        attendance
    );
});

exports.updateAttendance = asyncHandler(async (req, res) => {
    const attendance = await attendanceService.updateAttendance(
        req.params.id,
        req.validatedData.body
    );

    return success(
        res,
        200,
        "Attendance updated successfully",
        attendance
    );
});

exports.deleteAttendance = asyncHandler(async (req, res) => {
    await attendanceService.deleteAttendance(req.params.id);

    return success(
        res,
        200,
        "Attendance deleted successfully"
    );
});