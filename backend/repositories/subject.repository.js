const Subject = require("../models/Subject");

class SubjectRepository {
    async create(data) {
        return await Subject.create(data);
    }

    async findAll() {
        return await Subject.find({
            isActive: true,
        })
            .populate("department", "name code")
            .sort({
                semester: 1,
                name: 1,
            });
    }

    async findById(id) {
        return await Subject.findById(id)
            .populate("department", "name code");
    }

    async findByName(name) {
        return await Subject.findOne({
            name,
            isActive: true,
        });
    }

    async findByCode(code) {
        return await Subject.findOne({
            code,
            isActive: true,
        });
    }

    async findByDepartment(departmentId) {
        return await Subject.find({
            department: departmentId,
            isActive: true,
        })
            .populate("department", "name code")
            .sort({
                semester: 1,
                name: 1,
            });
    }

    async updateById(id, data) {
        return await Subject.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        ).populate(
            "department",
            "name code"
        );
    }

    async deleteById(id) {
        return await Subject.findByIdAndUpdate(
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

module.exports = new SubjectRepository();