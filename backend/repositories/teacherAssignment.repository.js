const TeacherAssignment = require("../models/TeacherAssignment");

class TeacherAssignmentRepository {
    async create(data) {
        return await TeacherAssignment.create(data);
    }

    async findAll() {
        return await TeacherAssignment.find()
            .populate("teacher", "firstName lastName email employeeId")
            .populate("subject", "name code semester")
            .populate("department", "name code")
            .sort({
                createdAt: -1,
            });
    }

    async findById(id) {
        return await TeacherAssignment.findById(id)
            .populate("teacher", "firstName lastName email employeeId")
            .populate("subject", "name code semester")
            .populate("department", "name code");
    }

    async findByTeacher(teacherId) {
        return await TeacherAssignment.find({
            teacher: teacherId,
            isActive: true,
        })
            .populate("subject", "name code semester")
            .populate("department", "name code");
    }

    async findByDepartment(departmentId) {
        return await TeacherAssignment.find({
            department: departmentId,
            isActive: true,
        })
            .populate("teacher", "firstName lastName employeeId")
            .populate("subject", "name code semester");
    }

    async updateById(id, data) {
        return await TeacherAssignment.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("teacher", "firstName lastName employeeId")
            .populate("subject", "name code semester")
            .populate("department", "name code");
    }

    async deleteById(id) {
        return await TeacherAssignment.findByIdAndUpdate(
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

module.exports = new TeacherAssignmentRepository();