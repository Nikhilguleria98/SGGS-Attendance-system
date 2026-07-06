const { z } = require("zod");

const objectId = /^[0-9a-fA-F]{24}$/;

const createSubjectSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Subject name is required"),

        code: z
            .string()
            .min(2, "Subject code is required"),

        department: z
            .string()
            .regex(objectId, "Invalid department id"),

        semester: z
            .number()
            .min(1)
            .max(8),

        credits: z
            .number()
            .min(1)
            .max(10)
            .optional(),

        description: z
            .string()
            .optional(),
    }),
});

const updateSubjectSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(objectId, "Invalid subject id"),
    }),

    body: z.object({
        name: z.string().optional(),

        code: z.string().optional(),

        department: z
            .string()
            .regex(objectId)
            .optional(),

        semester: z
            .number()
            .min(1)
            .max(8)
            .optional(),

        credits: z
            .number()
            .min(1)
            .max(10)
            .optional(),

        description: z
            .string()
            .optional(),
    }),
});

module.exports = {
    createSubjectSchema,
    updateSubjectSchema,
};