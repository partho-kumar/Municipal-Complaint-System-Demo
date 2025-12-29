"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export default async function getUserDetails() {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return {
            success: false,
            message: "আপনার সেশন শেষ হয়েছে, দয়া করে লগ ইন করুন",
        };
    }

    const user = await User.findOne({ _id: session.user.id });
    return {
        success: true,
        data: JSON.stringify(user),
    };
}
