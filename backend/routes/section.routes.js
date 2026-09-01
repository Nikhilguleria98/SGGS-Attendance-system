const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/section.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// Apply protect to all routes
router.use(protect);

router.get("/", authorize("hod", "teacher"), sectionController.getSections);
router.post("/", authorize("hod"), sectionController.createSection);
router.patch("/:id", authorize("hod"), sectionController.updateSection);
router.delete("/:id", authorize("hod"), sectionController.deleteSection);

module.exports = router;
