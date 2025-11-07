// app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// test route
app.get("/", (_req, res) => {
  res.json({ message: "Backend is running ✅" });
});

// main routes
app.use("/api/auth", authRoutes);

export default app;
