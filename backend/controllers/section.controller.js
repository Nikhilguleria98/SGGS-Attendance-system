const Section = require("../models/Section");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/response");

exports.getSections = asyncHandler(async (req, res) => {
    const sections = await Section.find().sort({ name: 1 });
    return success(res, 200, "Sections fetched successfully", sections);
});

exports.createSection = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ success: false, message: "Section name is required" });
    }
    
    // Check if exists
    const existing = await Section.findOne({ name: name.toUpperCase() });
    if (existing) {
        return res.status(400).json({ success: false, message: "Section already exists" });
    }

    const section = await Section.create({ name, description });
    return success(res, 201, "Section created successfully", section);
});

exports.deleteSection = asyncHandler(async (req, res) => {
    const section = await Section.findById(req.params.id);
    if (!section) {
        return res.status(404).json({ success: false, message: "Section not found" });
    }
    await section.deleteOne();
    return success(res, 200, "Section deleted successfully");
});

exports.updateSection = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const section = await Section.findById(req.params.id);
    
    if (!section) {
        return res.status(404).json({ success: false, message: "Section not found" });
    }

    if (name) {
        // Check if name exists for another section
        const existing = await Section.findOne({ name: name.toUpperCase(), _id: { $ne: req.params.id } });
        if (existing) {
            return res.status(400).json({ success: false, message: "Section name already exists" });
        }
        section.name = name;
    }
    
    if (description !== undefined) {
        section.description = description;
    }

    await section.save();
    return success(res, 200, "Section updated successfully", section);
});
