const User = require("../models/users");

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByRole(role) {
        return await User.find({
            role,
            isActive: true,
        }).populate("department", "name code");
    }

    async findById(id) {
        return await User.findById(id).populate("department", "name code");
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByEmployeeId(employeeId) {
        return await User.findOne({ employeeId });
    }

    async findByRollNumber(rollNumber) {
        return await User.findOne({ rollNumber });
    }

    async updateById(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).populate("department", "name code");
    }

    async deleteById(id) {
        return await User.findByIdAndDelete(id);
    }

    async exists(filter) {
        return await User.exists(filter);
    }

    async count(filter = {}) {
        return await User.countDocuments(filter);
    }
    async findByRole(role) {
        return await User.find({
            role,
            isActive: true,
        })
            .populate("department", "name code")
            .sort({ firstName: 1 });
    }
}

module.exports = new UserRepository();