const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");

const teacherAssignmentController = require(
    "../controllers/teacherAssignment.controller"
);

const {
    createTeacherAssignmentSchema,
    updateTeacherAssignmentSchema,
    assignmentIdSchema,
} = require("../validators/teacherAssignment.validator");

// ==========================
// Create Assignment
// ==========================
router.post(
    "/",
    validate(createTeacherAssignmentSchema),
    teacherAssignmentController.createAssignment
);

// ==========================
// Read
// ==========================

// Get all assignments
router.get(
    "/",
    teacherAssignmentController.getAssignments
);

// Get assignments by teacher
router.get(
    "/teacher/:teacherId",
    teacherAssignmentController.getAssignmentsByTeacher
);

// Get assignments by department
router.get(
    "/department/:departmentId",
    teacherAssignmentController.getAssignmentsByDepartment
);

// Get assignment by id
router.get(
    "/:id",
    validate(assignmentIdSchema),
    teacherAssignmentController.getAssignment
);

// ==========================
// Update
// ==========================
router.patch(
    "/:id",
    validate(updateTeacherAssignmentSchema),
    teacherAssignmentController.updateAssignment
);

// ==========================
// Delete
// ==========================
router.delete(
    "/:id",
    validate(assignmentIdSchema),
    teacherAssignmentController.deleteAssignment
);

module.exports = router;