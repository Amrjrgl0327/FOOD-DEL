import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    bookName: { type: String, required: true },
    publishedAt: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamp: true,
  },
);

export const Book = mongoose.model("book", bookSchema);
