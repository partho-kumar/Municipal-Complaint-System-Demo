"use server";

import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function updateComplaint(
    complaintId: string,
    status: string
) {
    await connectDB();
    await Complaint.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(complaintId),
        },
        { status }
    );
    revalidatePath("/admin");
    return { success: true, message: "অভিযোগ সফলভাবে আপডেট করা হয়েছে" };
}
