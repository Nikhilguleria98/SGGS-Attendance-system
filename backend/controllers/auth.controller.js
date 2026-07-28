const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.login = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    if (!identifier || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide identifier, password, and role",
      });
    }

    // Map frontend roles to backend role constants
    const roleMap = {
      HOD: "hod",
      Teacher: "teacher",
      Student: "student",
    };

    const backendRole = roleMap[role] || (role && role.toLowerCase());

    if (!backendRole) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Trim and normalize search identifier to avoid failures due to trailing spaces or casing differences
    const normalizedIdentifier = identifier.trim();
    const user = await User.findOne({
      $or: [
        { email: normalizedIdentifier.toLowerCase() },
        { employeeId: normalizedIdentifier.toUpperCase() },
        { rollNumber: normalizedIdentifier.toUpperCase() },
      ],
    }).select("+password"); // Need password to compare

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify role matches
    if (user.role !== backendRole) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials for this role",
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "1d" }
    );

    // Remove password from response
    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        role: user.role,
        email: user.email,
        name: user.firstName + (user.lastName ? " " + user.lastName : ""),
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};