"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import createComplaintSchema from "@/lib/validators/createComplaint.schema";
import Complaint from "@/models/Complaint";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import z from "zod";

export default async function createComplaint(
    complaintData: z.infer<typeof createComplaintSchema>
) {
    await connectDB();

    const { category, location, description } = complaintData;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return {
            success: false,
            message: "আপনার সেশন শেষ হয়েছে, দয়া করে লগ ইন করুন",
        };
    }
    const { user } = session;
    await Complaint.create({
        category,
        location,
        description,
        userId: new mongoose.Types.ObjectId(user.id as string),
    });
    return {
        success: true,
        message: "অভিযোগ সফলভাবে দাখিল করা হয়েছে",
    };
}
