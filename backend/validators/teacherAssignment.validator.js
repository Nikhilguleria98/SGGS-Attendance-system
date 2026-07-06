const { z } = require("zod");

const objectId = /^[0-9a-fA-F]{24}$/;

const createTeacherAssignmentSchema = z.object({
    body: z.object({
        teacher: z
            .string()
            .regex(objectId, "Invalid teacher id"),

        subject: z
            .string()
            .regex(objectId, "Invalid subject id"),

        department: z
            .string()
            .regex(objectId, "Invalid department id"),

        semester: z
            .number()
            .min(1)
            .max(8),

        batch: z
            .string()
            .min(4),

        section: z
            .string()
            .min(1)
            .max(2),

        academicYear: z
            .string()
            .min(4),
    }),
});

const updateTeacherAssignmentSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(objectId, "Invalid assignment id"),
    }),

    body: z.object({
        teacher: z
            .string()
            .regex(objectId)
            .optional(),

        subject: z
            .string()
            .regex(objectId)
            .optional(),

        department: z
            .string()
            .regex(objectId)
            .optional(),

        semester: z
            .number()
            .min(1)
            .max(8)
            .optional(),

        batch: z
            .string()
            .optional(),

        section: z
            .string()
            .optional(),

        academicYear: z
            .string()
            .optional(),
    }),
});

const assignmentIdSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(objectId, "Invalid assignment id"),
    }),
});

module.exports = {
    createTeacherAssignmentSchema,
    updateTeacherAssignmentSchema,
    assignmentIdSchema,
};