const { z } = require("zod");

const objectId = /^[0-9a-fA-F]{24}$/;

const markAttendanceSchema = z.object({
    body: z.object({
        student: z.string().regex(objectId, "Invalid student id"),
        assignment: z.string().regex(objectId, "Invalid assignment id"),
        attendanceDate: z.string(),
        status: z.enum([
            "present",
            "absent",
            "medical",
            "duty",
            "holiday",
        ]),
        remarks: z.string().optional(),
    }),
});

const updateAttendanceSchema = z.object({
    params: z.object({
        id: z.string().regex(objectId),
    }),

    body: z.object({
        status: z
            .enum([
                "present",
                "absent",
                "medical",
                "duty",
                "holiday",
            ])
            .optional(),

        remarks: z.string().optional(),
    }),
});

const attendanceIdSchema = z.object({
    params: z.object({
        id: z.string().regex(objectId),
    }),
});

module.exports = {
    markAttendanceSchema,
    updateAttendanceSchema,
    attendanceIdSchema,
};