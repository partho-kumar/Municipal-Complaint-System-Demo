import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
        isEmailVerified: { type: Boolean, default: false },
        phone: { type: String },
        address: { type: String },
    },
    { timestamps: true }
);
export default models.User || mongoose.model("User", UserSchema);
