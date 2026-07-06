const teacherAssignmentRepository = require("../repositories/teacherAssignment.repository");

const userRepository = require("../repositories/user.repository");
const subjectRepository = require("../repositories/subject.repository");
const departmentRepository = require("../repositories/department.repository");

const ApiError = require("../utils/ApiError");

class TeacherAssignmentService {
    async createAssignment(data) {
        const teacher = await userRepository.findById(data.teacher);

        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        if (teacher.role !== "teacher") {
            throw new ApiError(400, "Selected user is not a teacher");
        }

        const subject = await subjectRepository.findById(data.subject);

        if (!subject) {
            throw new ApiError(404, "Subject not found");
        }

        const department = await departmentRepository.findById(
            data.department
        );

        if (!department) {
            throw new ApiError(404, "Department not found");
        }

        return await teacherAssignmentRepository.create(data);
    }

    async getAssignments() {
        return await teacherAssignmentRepository.findAll();
    }

    async getAssignmentById(id) {
        const assignment =
            await teacherAssignmentRepository.findById(id);

        if (!assignment) {
            throw new ApiError(404, "Assignment not found");
        }

        return assignment;
    }

    async getAssignmentsByTeacher(teacherId) {
        return await teacherAssignmentRepository.findByTeacher(
            teacherId
        );
    }

    async getAssignmentsByDepartment(departmentId) {
        return await teacherAssignmentRepository.findByDepartment(
            departmentId
        );
    }

    async updateAssignment(id, data) {
        const assignment =
            await teacherAssignmentRepository.updateById(
                id,
                data
            );

        if (!assignment) {
            throw new ApiError(404, "Assignment not found");
        }

        return assignment;
    }

    async deleteAssignment(id) {
        const assignment =
            await teacherAssignmentRepository.deleteById(id);

        if (!assignment) {
            throw new ApiError(404, "Assignment not found");
        }

        return assignment;
    }
}

module.exports = new TeacherAssignmentService();