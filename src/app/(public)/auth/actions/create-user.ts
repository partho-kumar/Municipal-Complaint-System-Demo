"use server";

import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import signupSchema from "@/lib/validators/signup.schema";
import User from "@/models/User";
import z from "zod";

export default async function createUser(
    userData: z.infer<typeof signupSchema>
) {
    await connectDB();

    const { password, email, ...user } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
            success: false,
            message: "ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে",
        };
    }

    const hashedPassword = await hashPassword(password);

    const data = await User.create({
        ...user,
        email,
        password: hashedPassword,
    });

    console.log(data);

    return { success: true, message: "User created successfully" };
}
