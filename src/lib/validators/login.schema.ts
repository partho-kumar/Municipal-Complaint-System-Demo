import z from "zod";

const loginSchema = z.object({
    email: z.string().email("Email is required"),
    password: z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(100),
});

export default loginSchema;
