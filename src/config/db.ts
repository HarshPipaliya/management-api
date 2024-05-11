import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URI || "";

const db = () => {
  console.log(MONGO_URL);
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Database Connected!");
    })
    .catch((err: Error) => {
      console.log("Error in database connection", err?.message);
    });
};

export default db;
