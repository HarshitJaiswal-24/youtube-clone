import express from "express";
import { loginUser } from "../controller/login.controller.js";

const router = express.Router();

// ✅ POST /api/auth/login
router.post("/", loginUser);

export default router;
