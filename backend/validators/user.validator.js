const { z } = require("zod");
const roles = require("../constants/roles");
const objectId = /^[0-9a-fA-F]{24}$/;
const createUserSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .min(2, "First name is required"),

        lastName: z
            .string()
            .min(2, "Last name is required"),

        email: z
            .string()
            .email("Invalid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

            role: z.enum(Object.values(roles)),

        phone: z
            .string()
            .optional(),

        department: z
            .string()
            .optional(),

        semester: z
            .number()
            .optional(),

        section: z
            .string()
            .optional(),

        employeeId: z
            .string()
            .optional(),

        rollNumber: z
            .string()
            .optional(),
    }),
});
const updateUserSchema = z.object({
    params: z.object({
        id: z.string().regex(objectId, "Invalid user id"),
    }),

    body: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        designation: z.string().optional(),
        department: z.string().optional(),
        semester: z.number().optional(),
        section: z.string().optional(),
        batch: z.string().optional(),
    }),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
};