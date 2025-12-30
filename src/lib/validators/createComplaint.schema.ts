import z from "zod";

const createComplaintSchema = z.object({
    category: z.string().min(1, "Category is required"),
    location: z.string().min(1, "Location is required"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long"),
});

export default createComplaintSchema;
