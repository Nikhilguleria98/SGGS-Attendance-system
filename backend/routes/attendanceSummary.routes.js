const express = require("express");
const router = express.Router();

const {
    createSummary,
    getSummaries,
    getStudentDashboard,
    getStudentDashboardByParam,
    getTeacherReport,
    getHodDashboard,
    getSummaryByAssignmentAndStudent,
    updateSummary,
    deleteSummary,
} = require("../controllers/attendanceSummary.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

// All routes require authentication
router.use(protect);

// ─── Student Dashboard ───────────────────────────────────────────────────────

/**
 * GET /api/attendance-summary/student-dashboard
 *
 * Returns the JWT-authenticated student's own subject-wise summary.
 * Access: student only.
 * A student cannot access another student's data — the ID comes from the JWT.
 */
router.get(
    "/student-dashboard",
    authorize("student"),
    getStudentDashboard
);

/**
 * GET /api/attendance-summary/student-dashboard/:studentId
 *
 * Returns any student's summary by ID, for teacher/HOD inspection.
 * Access: hod, teacher.
 */
router.get(
    "/student-dashboard/:studentId",
    authorize("hod", "teacher"),
    getStudentDashboardByParam
);

// ─── Reports & Dashboards ─────────────────────────────────────────────────────

router.get(
    "/teacher-report",
    authorize("teacher"),
    getTeacherReport
);

router.get(
    "/hod-dashboard",
    authorize("hod"),
    getHodDashboard
);

// ─── Per-summary lookup ───────────────────────────────────────────────────────

router.get(
    "/assignment/:assignmentId/student/:studentId",
    authorize("hod", "teacher", "student"),
    getSummaryByAssignmentAndStudent
);

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

router.get(
    "/",
    authorize("hod"),
    getSummaries
);

router.post(
    "/",
    authorize("hod"),
    createSummary
);

router.patch(
    "/:id",
    authorize("hod"),
    updateSummary
);

router.delete(
    "/:id",
    authorize("hod"),
    deleteSummary
);

module.exports = router;
