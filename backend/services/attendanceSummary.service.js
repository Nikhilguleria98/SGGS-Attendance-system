const attendanceSummaryRepository = require("../repositories/attendanceSummary.repository");
const ApiError = require("../utils/ApiError");

class AttendanceSummaryService {
    async createSummary(data) {
        return await attendanceSummaryRepository.create(data);
    }

    async getAllSummaries() {
        return await attendanceSummaryRepository.findAll();
    }

    async getSummaryByAssignmentAndStudent(assignmentId, studentId) {
        const summary = await attendanceSummaryRepository.findByAssignmentAndStudent(assignmentId, studentId);
        if (!summary) {
            throw new ApiError(404, "Attendance summary not found");
        }
        return summary;
    }

    /**
     * Build a frontend-ready DTO for the student's attendance dashboard.
     * Each item in the array represents one subject/assignment pair.
     *
     * The repository guarantees full population of:
     *   assignment → teacher, assignment → subject → department
     *
     * No frontend calculations are required — percentage is pre-computed
     * and always a numeric value in [0, 100].
     *
     * @param {string|ObjectId} studentId
     * @returns {Promise<Array>}
     */
    async getStudentDashboardData(studentId) {
        const summaries = await attendanceSummaryRepository.findByStudentId(studentId);

        return summaries.map(summary => {
            const { assignment } = summary;
            const subject    = assignment?.subject    ?? {};
            const teacher    = assignment?.teacher    ?? {};
            const department = subject?.department    ?? {};

            const delivered = summary.classesDelivered ?? 0;
            const attended  = summary.classesAttended  ?? 0;
            const absent    = summary.classesAbsent    ?? 0;

            const percentage = delivered > 0
                ? parseFloat(((attended / delivered) * 100).toFixed(2))
                : 0;

            return {
                subject:      subject.name        ?? "",
                subjectCode:  subject.code        ?? "",
                teacher:      [teacher.firstName, teacher.lastName].filter(Boolean).join(" "),
                department:   department.name     ?? "",
                semester:     assignment?.semester ?? null,
                batch:        assignment?.batch    ?? "",
                section:      assignment?.section  ?? "",
                academicYear: assignment?.academicYear ?? "",
                delivered,
                attended,
                absent,
                percentage,
            };
        });
    }

    async getTeacherReportData(teacherId, filters, options) {
        const result = await attendanceSummaryRepository.getTeacherReport(teacherId, filters, options);
        
        const mappedData = result.data.map(summary => {
            const delivered = summary.classesDelivered ?? 0;
            const attended = summary.classesAttended ?? 0;
            const absent = summary.classesAbsent ?? 0;
            
            const percentage = delivered > 0 
                ? parseFloat(((attended / delivered) * 100).toFixed(2)) 
                : 0;
            
            return {
                studentId: summary.studentDetails?._id ?? "",
                student: `${summary.studentDetails?.firstName ?? ""} ${summary.studentDetails?.lastName ?? ""}`.trim(),
                rollNumber: summary.studentDetails?.rollNumber ?? "",
                department: summary.departmentDetails?.name ?? "",
                semester: summary.assignmentDetails?.semester ?? null,
                batch: summary.studentDetails?.batch ?? "",
                section: summary.studentDetails?.section ?? "",
                subject: summary.subjectDetails?.name ?? "",
                teacher: `${summary.teacherDetails?.firstName ?? ""} ${summary.teacherDetails?.lastName ?? ""}`.trim(),
                delivered,
                attended,
                absent,
                percentage
            };
        });

        return {
            data: mappedData,
            page: result.page,
            limit: result.limit,
            total: result.total,
            totalPages: result.totalPages
        };
    }

    async getHodDashboardData(departmentId) {
        const stats = await attendanceSummaryRepository.getHodDashboardStats(departmentId);
        
        if (!stats) {
            return { overall: null, departmentAverage: [], subjectAverage: [], below75: [], topPerformers: [], monthlyTrend: [] };
        }

        const calcPercentage = (attended, delivered) => {
            if (!delivered) return 0;
            return parseFloat(((attended / delivered) * 100).toFixed(2));
        };

        const overall = stats.overall[0] ? {
            delivered: stats.overall[0].totalDelivered,
            attended: stats.overall[0].totalAttended,
            percentage: calcPercentage(stats.overall[0].totalAttended, stats.overall[0].totalDelivered)
        } : null;

        const departmentAverage = stats.departmentAverage.map(d => ({
            departmentId: d._id,
            departmentName: d.departmentName,
            percentage: calcPercentage(d.totalAttended, d.totalDelivered)
        }));

        const subjectAverage = stats.subjectAverage.map(s => ({
            subjectId: s._id,
            subjectName: s.subjectName,
            percentage: calcPercentage(s.totalAttended, s.totalDelivered)
        }));

        const studentsStats = stats.studentsStats || [];
        
        const below75 = studentsStats.filter(s => s.percentage < 75).map(s => ({
            studentId: s._id,
            name: `${s.firstName} ${s.lastName || ''}`.trim(),
            rollNumber: s.rollNumber,
            percentage: s.percentage
        }));

        const topPerformers = studentsStats
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 10)
            .map(s => ({
                studentId: s._id,
                name: `${s.firstName} ${s.lastName || ''}`.trim(),
                rollNumber: s.rollNumber,
                percentage: s.percentage
            }));

        return {
            overall,
            departmentAverage,
            subjectAverage,
            below75,
            topPerformers,
            monthlyTrend: [] // Not supported natively in AttendanceSummary
        };
    }

    async updateSummary(id, data) {
        const summary = await attendanceSummaryRepository.updateById(id, data);
        if (!summary) {
            throw new ApiError(404, "Attendance summary not found");
        }
        return summary;
    }

    async deleteSummary(id) {
        const summary = await attendanceSummaryRepository.deleteById(id);
        if (!summary) {
            throw new ApiError(404, "Attendance summary not found");
        }
        return summary;
    }
}

module.exports = new AttendanceSummaryService();
