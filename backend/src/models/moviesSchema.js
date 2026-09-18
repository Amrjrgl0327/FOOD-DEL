import mongoose, { Schema } from "mongoose";

const moviesSchema = new Schema(
  {
    movieTitle: { type: String, required: true },
    date: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamp: true,
  },
);

export const Movie = mongoose.model("movie", moviesSchema);
