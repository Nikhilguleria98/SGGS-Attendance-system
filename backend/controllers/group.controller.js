const Group = require("../models/Group");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/response");

exports.getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find().sort({ name: 1 });
    return success(res, 200, "Groups fetched successfully", groups);
});

exports.createGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ success: false, message: "Group name is required" });
    }
    
    // Check if exists
    const existing = await Group.findOne({ name: name.toUpperCase() });
    if (existing) {
        return res.status(400).json({ success: false, message: "Group already exists" });
    }

    const group = await Group.create({ name, description });
    return success(res, 201, "Group created successfully", group);
});

exports.deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
        return res.status(404).json({ success: false, message: "Group not found" });
    }
    await group.deleteOne();
    return success(res, 200, "Group deleted successfully");
});
