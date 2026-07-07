const Batch = require("../models/Batch");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/response");

exports.getBatches = asyncHandler(async (req, res) => {
    const batches = await Batch.find().sort({ name: 1 });
    return success(res, 200, "Batches fetched successfully", batches);
});

exports.createBatch = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ success: false, message: "Batch name is required" });
    }
    
    // Check if exists
    const existing = await Batch.findOne({ name: name.toUpperCase() });
    if (existing) {
        return res.status(400).json({ success: false, message: "Batch already exists" });
    }

    const batch = await Batch.create({ name, description });
    return success(res, 201, "Batch created successfully", batch);
});

exports.deleteBatch = asyncHandler(async (req, res) => {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
        return res.status(404).json({ success: false, message: "Batch not found" });
    }
    await batch.deleteOne();
    return success(res, 200, "Batch deleted successfully");
});

exports.updateBatch = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const batch = await Batch.findById(req.params.id);
    
    if (!batch) {
        return res.status(404).json({ success: false, message: "Batch not found" });
    }

    if (name) {
        // Check if name exists for another batch
        const existing = await Batch.findOne({ name: name.toUpperCase(), _id: { $ne: req.params.id } });
        if (existing) {
            return res.status(400).json({ success: false, message: "Batch name already exists" });
        }
        batch.name = name;
    }
    
    if (description !== undefined) {
        batch.description = description;
    }

    await batch.save();
    return success(res, 200, "Batch updated successfully", batch);
});
