import express from "express";
import db from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import { AuthRoutes } from "./routes";
dotenv.config();

const PORT = process.env.PORT || 8000;

db();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use("/api/auth",AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
