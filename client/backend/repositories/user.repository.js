const User = require("../models/users");

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findAll(filter = {}) {
        return await User.find(filter);
    }

    async findById(id) {
        return await User.findById(id);
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
        });
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
}

module.exports = new UserRepository();