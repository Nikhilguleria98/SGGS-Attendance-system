const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batch.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// Apply protect to all routes
router.use(protect);

router.get("/", authorize("hod", "teacher"), batchController.getBatches);
router.post("/", authorize("hod"), batchController.createBatch);
router.delete("/:id", authorize("hod"), batchController.deleteBatch);

module.exports = router;
