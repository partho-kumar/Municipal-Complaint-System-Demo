import z from "zod";

const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Email is required"),
    password: z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(100),
});

export default signupSchema;
