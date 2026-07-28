const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// Apply protect to all routes
router.use(protect);

router.get("/", authorize("hod", "teacher"), groupController.getGroups);
router.post("/", authorize("hod"), groupController.createGroup);
router.patch("/:id", authorize("hod"), groupController.updateGroup);
router.delete("/:id", authorize("hod"), groupController.deleteGroup);

module.exports = router;
