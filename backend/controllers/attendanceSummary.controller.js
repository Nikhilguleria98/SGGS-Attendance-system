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

/**
 * GET /api/attendance-summary/student-dashboard
 *
 * Returns the authenticated student's own attendance summary.
 * Student ID is read exclusively from the JWT (req.user._id) — no route
 * param is accepted here, preventing a student from querying another user.
 */
exports.getStudentDashboard = asyncHandler(async (req, res) => {
    const studentId = req.user._id;
    const dashboardData = await attendanceSummaryService.getStudentDashboardData(studentId);
    return success(res, 200, "Attendance summary fetched successfully", dashboardData);
});

/**
 * GET /api/attendance-summary/student-dashboard/:studentId
 *
 * Allows a teacher or HOD to view any student's dashboard by ID.
 * Protected separately in the router with authorize("hod", "teacher").
 */
exports.getStudentDashboardByParam = asyncHandler(async (req, res) => {
    const dashboardData = await attendanceSummaryService.getStudentDashboardData(req.params.studentId);
    return success(res, 200, "Attendance summary fetched successfully", dashboardData);
});


exports.getTeacherReport = asyncHandler(async (req, res) => {
    const { 
        department, batch, section, subject, 
        semester, academicYear, attendanceBelow, attendanceAbove, search, fromDate, toDate,
        page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" 
    } = req.query;
    
    const filters = {};
    if (department) filters.department = department;
    if (batch) filters.batch = batch;
    if (section) filters.section = section;
    if (subject) filters.subject = subject;
    if (semester) filters.semester = semester;
    if (academicYear) filters.academicYear = academicYear;
    if (attendanceBelow) filters.attendanceBelow = attendanceBelow;
    if (attendanceAbove) filters.attendanceAbove = attendanceAbove;
    if (search) filters.search = search;
    if (fromDate) filters.fromDate = fromDate;
    if (toDate) filters.toDate = toDate;

    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    
    const reportData = await attendanceSummaryService.getTeacherReportData(
        req.user._id, 
        filters, 
        {
            page: parseInt(page),
            limit: parseInt(limit),
            sort
        }
    );

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
