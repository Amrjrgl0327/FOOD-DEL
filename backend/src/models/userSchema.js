import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  {
    timestamp: true,
  },
);

export const User = mongoose.model("User", userSchema);
