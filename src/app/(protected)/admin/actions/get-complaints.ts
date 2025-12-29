"use server";

import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { IComplaint } from "@/types/complaint";

export default async function getComplaints() {
    await connectDB();
    const complaints = await Complaint.find().populate(
        "userId",
        "name email phone address"
    );
    return {
        success: true,
        data: JSON.stringify(complaints as IComplaint[]),
    };
}
