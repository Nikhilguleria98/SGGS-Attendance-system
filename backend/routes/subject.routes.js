const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const subjectController = require("../controllers/subject.controller");

const {
    createSubjectSchema,
    updateSubjectSchema,
} = require("../validators/subject.validator");

router.use(protect);

// ==========================
// Create
// ==========================
router.post(
    "/",
    authorize("hod"),
    validate(createSubjectSchema),
    subjectController.createSubject
);

// ==========================
// Read
// ==========================

// Get all subjects
router.get(
    "/",
    authorize("hod", "teacher", "student"),
    subjectController.getSubjects
);

// Get subjects by department
router.get(
    "/department/:departmentId",
    authorize("hod", "teacher", "student"),
    subjectController.getSubjectsByDepartment
);

// Get subject by id
router.get(
    "/:id",
    authorize("hod", "teacher", "student"),
    subjectController.getSubject
);

// ==========================
// Update
// ==========================
router.patch(
    "/:id",
    authorize("hod"),
    validate(updateSubjectSchema),
    subjectController.updateSubject
);

// ==========================
// Delete
// ==========================
router.delete(
    "/:id",
    authorize("hod"),
    subjectController.deleteSubject
);

module.exports = router;