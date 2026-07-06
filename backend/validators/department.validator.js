const { z } = require("zod");

const objectId = /^[0-9a-fA-F]{24}$/;

const createDepartmentSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "Department name is required"),

        code: z
            .string()
            .min(2, "Department code is required"),

        description: z
            .string()
            .optional(),

        hod: z
            .string()
            .regex(objectId, "Invalid HOD id")
            .optional(),
    }),
});

const updateDepartmentSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(objectId, "Invalid Department id"),
    }),

    body: z.object({
        name: z.string().optional(),

        code: z.string().optional(),

        description: z.string().optional(),

        hod: z
            .string()
            .regex(objectId)
            .optional(),
    }),
});

module.exports = {
    createDepartmentSchema,
    updateDepartmentSchema,
};