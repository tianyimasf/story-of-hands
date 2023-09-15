import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./../../.env") });

const { MONGO_URI } = process.env;

export const connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI!)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error: Error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
