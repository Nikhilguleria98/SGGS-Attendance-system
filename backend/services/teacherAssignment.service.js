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

    async getTeacherAssignmentSummary(teacherIds) {
        const assignments = await teacherAssignmentRepository.findAssignmentsByTeachers(teacherIds);

        const summaryMap = {};
        for (const id of teacherIds) {
            summaryMap[id.toString()] = {
                teacherId: id,
                assignments: [],
                departments: new Set(),
                batches: new Set(),
                groups: new Set(),
                subjects: new Set()
            };
        }

        for (const assignment of assignments) {
            const tId = assignment.teacher?._id?.toString() || assignment.teacher?.toString();
            if (summaryMap[tId]) {
                const summary = summaryMap[tId];
                summary.assignments.push(assignment);
                
                if (assignment.department) {
                    summary.departments.add(assignment.department.name || assignment.department);
                }
                if (assignment.batch) {
                    summary.batches.add(assignment.batch);
                }
                if (assignment.section) {
                    summary.groups.add(assignment.section);
                }
                if (assignment.subject) {
                    summary.subjects.add(assignment.subject.name || assignment.subject);
                }
            }
        }

        // Convert Sets back to Arrays
        const finalSummary = {};
        for (const key in summaryMap) {
            const s = summaryMap[key];
            finalSummary[key] = {
                teacherId: s.teacherId,
                assignments: s.assignments,
                departments: Array.from(s.departments),
                batches: Array.from(s.batches),
                groups: Array.from(s.groups),
                subjects: Array.from(s.subjects)
            };
        }

        return finalSummary;
    }

    async getAssignmentStudents(assignmentId, teacherId) {
        const assignment = await teacherAssignmentRepository.findById(assignmentId);
        
        if (!assignment) {
            throw new ApiError(404, "Assignment not found");
        }

        // Validate teacher ownership
        if (assignment.teacher?._id?.toString() !== teacherId.toString() && assignment.teacher?.toString() !== teacherId.toString()) {
            throw new ApiError(403, "You do not have permission to access students for this assignment");
        }

        const departmentId = assignment.department?._id ?? assignment.department;
        
        return await userRepository.findStudentsByAssignment(
            departmentId,
            assignment.batch,
            assignment.section
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