const Department = require("../models/Department");

class DepartmentRepository {
    async create(data) {
        return await Department.create(data);
    }

    async findAll() {
        return await Department.find({
            isActive: true,
        })
            .populate("hod", "firstName lastName employeeId")
            .sort({ name: 1 });
    }

    async findById(id) {
        return await Department.findById(id)
            .populate("hod", "firstName lastName employeeId");
    }

    async findByName(name) {
        return await Department.findOne({
            name,
            isActive: true,
        });
    }

    async findByCode(code) {
        return await Department.findOne({
            code,
            isActive: true,
        });
    }

    async updateById(id, data) {
        return await Department.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        ).populate(
            "hod",
            "firstName lastName employeeId"
        );
    }

    async deleteById(id) {
        return await Department.findByIdAndUpdate(
            id,
            {
                isActive: false,
            },
            {
                new: true,
            }
        );
    }
}

module.exports = new DepartmentRepository();