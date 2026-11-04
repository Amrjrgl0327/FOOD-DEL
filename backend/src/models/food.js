import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    ingredients: { type: String, default: "" },
    image: { type: String, default: "" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true },
);

export const Food = mongoose.model("Food", foodSchema);
