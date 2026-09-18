import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export const connectDB = async () => {
  const connectionString = process.env.connectionString;
  console.log("eniig avbal duus", connectionString);
  try {
    await mongoose.connect(connectionString);
    console.log("db connection success");
  } catch (error) {
    console.log("db error", error);
  }
};
