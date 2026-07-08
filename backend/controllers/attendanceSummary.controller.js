const attendanceSummaryService = require("../services/attendanceSummary.service");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/response");

exports.createSummary = asyncHandler(async (req, res) => {
    const summary = await attendanceSummaryService.createSummary(req.validatedData.body);
    return success(res, 201, "Attendance summary created successfully", summary);
});

exports.getSummaries = asyncHandler(async (req, res) => {
    const summaries = await attendanceSummaryService.getAllSummaries();
    return success(res, 200, "Attendance summaries fetched successfully", summaries);
});

exports.getStudentDashboard = asyncHandler(async (req, res) => {
    // Determine student ID: either from route param or logged in user
    const studentId = req.params.studentId || req.user._id;
    const dashboardData = await attendanceSummaryService.getStudentDashboardData(studentId);
    return success(res, 200, "Student dashboard data fetched successfully", dashboardData);
});

exports.getTeacherReport = asyncHandler(async (req, res) => {
    const { department, batch, section, subject, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query;
    
    const filters = {};
    if (department) filters.department = department;
    if (batch) filters.batch = batch;
    if (section) filters.section = section;
    if (subject) filters.subject = subject;

    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    
    const reportData = await attendanceSummaryService.getTeacherReportData(filters, {
        page: parseInt(page),
        limit: parseInt(limit),
        sort
    });

    return success(res, 200, "Teacher report fetched successfully", reportData);
});

exports.getHodDashboard = asyncHandler(async (req, res) => {
    const { departmentId } = req.query; // Optional filter by department
    const dashboardData = await attendanceSummaryService.getHodDashboardData(departmentId);
    return success(res, 200, "HOD dashboard data fetched successfully", dashboardData);
});

exports.getSummaryByAssignmentAndStudent = asyncHandler(async (req, res) => {
    const { assignmentId, studentId } = req.params;
    const summary = await attendanceSummaryService.getSummaryByAssignmentAndStudent(assignmentId, studentId);
    return success(res, 200, "Attendance summary fetched successfully", summary);
});

exports.updateSummary = asyncHandler(async (req, res) => {
    const summary = await attendanceSummaryService.updateSummary(req.params.id, req.validatedData.body);
    return success(res, 200, "Attendance summary updated successfully", summary);
});

exports.deleteSummary = asyncHandler(async (req, res) => {
    await attendanceSummaryService.deleteSummary(req.params.id);
    return success(res, 200, "Attendance summary deleted successfully");
});
