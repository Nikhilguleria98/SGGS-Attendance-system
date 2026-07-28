const express = require("express");
const router = express.Router();
const semesterController = require("../controllers/semester.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.use(protect);

// Anyone logged in can read semesters
router.get("/", semesterController.getSemesters);
router.get("/:id", semesterController.getSemesterById);

// Only HOD can modify semesters
router.post(
    "/",
    authorize("hod"),
    semesterController.createSemester
);

router.patch(
    "/:id",
    authorize("hod"),
    semesterController.updateSemester
);

router.delete(
    "/:id",
    authorize("hod"),
    semesterController.deleteSemester
);

module.exports = router;
