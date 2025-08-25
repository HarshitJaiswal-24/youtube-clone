import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import loginRoute from "./routes/login.routes.js";
import registerRoute from "./routes/register.routes.js";
import videosRoute from "./routes/videos.route.js";
import channelRoute from "./routes/channel.route.js";

const port = 3100;
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("open", () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error", err);
});

// Routes
app.use("/api/auth/login", loginRoute);
app.use("/api/auth/register", registerRoute); // ✅ frontend POST to /api/auth/register
app.use("/api/videos", videosRoute);
app.use("/api/channels", channelRoute);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});
