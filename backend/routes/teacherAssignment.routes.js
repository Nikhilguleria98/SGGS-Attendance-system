const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const teacherAssignmentController = require(
    "../controllers/teacherAssignment.controller"
);

const {
    createTeacherAssignmentSchema,
    updateTeacherAssignmentSchema,
    assignmentIdSchema,
} = require("../validators/teacherAssignment.validator");

router.use(protect);

// ==========================
// Create Assignment
// ==========================
router.post(
    "/",
    authorize("hod"),
    validate(createTeacherAssignmentSchema),
    teacherAssignmentController.createAssignment
);

// ==========================
// Read
// ==========================

// Get all assignments
router.get(
    "/",
    authorize("hod", "teacher"),
    teacherAssignmentController.getAssignments
);

// Get assignments by teacher
router.get(
    "/teacher/:teacherId",
    authorize("hod", "teacher"),
    teacherAssignmentController.getAssignmentsByTeacher
);

// Get assignments by department
router.get(
    "/department/:departmentId",
    authorize("hod", "teacher"),
    teacherAssignmentController.getAssignmentsByDepartment
);

// Get assignment by id
router.get(
    "/:id",
    authorize("hod", "teacher"),
    validate(assignmentIdSchema),
    teacherAssignmentController.getAssignment
);

// ==========================
// Update
// ==========================
router.patch(
    "/:id",
    authorize("hod"),
    validate(updateTeacherAssignmentSchema),
    teacherAssignmentController.updateAssignment
);

// ==========================
// Delete
// ==========================
router.delete(
    "/:id",
    authorize("hod"),
    validate(assignmentIdSchema),
    teacherAssignmentController.deleteAssignment
);

module.exports = router;