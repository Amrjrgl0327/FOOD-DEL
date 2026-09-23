import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    // phoneNumber: { type: String },
    // role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamp: true,
  },
);

export const User = mongoose.model("User", userSchema);
