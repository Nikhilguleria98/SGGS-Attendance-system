const { z } = require("zod");
const bcrypt = require("bcryptjs");

const updateUserSchema = z.object({
    body: z.object({
        password: z.string().min(8, "Password must be at least 8 characters").optional(),
    }),
});

async function run() {
  const reqBody = { password: "NewPass123" };
  const validated = await updateUserSchema.parseAsync({ body: reqBody });
  let data = { ...validated.body };
  
  if (data.password) {
      const salt = await bcrypt.genSalt(12);
      data.password = await bcrypt.hash(data.password, salt);
  }
  
  console.log("Final data:", data);
  console.log("Hash length:", data.password.length);
}
run();
