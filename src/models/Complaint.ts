import mongoose, { models, Schema } from "mongoose";

const ComplaintSchema = new Schema(
    {
        category: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        status: {
            type: String,
            enum: [
                "pending",
                "under_review",
                "approved",
                "in_progress",
                "solved",
            ],
            default: "pending",
        },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);
export default models.Complaint || mongoose.model("Complaint", ComplaintSchema);
