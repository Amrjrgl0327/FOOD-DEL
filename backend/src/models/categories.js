import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model("Category", categoriesSchema);
