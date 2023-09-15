import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/database.js";
import tokenAuthRoutes from "./routes/tokenAuth.js";
import uploadRoutes from "./routes/uploads.js";

dotenv.config({ path: "./../.env" });
connect();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/tokenAuth", tokenAuthRoutes);
app.use("/api/upload", uploadRoutes);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
