"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getServerSession } from "next-auth";

export default async function getUserComplaint() {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return {
            success: false,
            message: "আপনার সেশন শেষ হয়েছে, দয়া করে লগ ইন করুন",
        };
    }

    const complaints = await Complaint.find({ userId: session.user.id });
    return {
        success: true,
        data: JSON.stringify(complaints),
    };
}
