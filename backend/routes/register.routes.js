import express from "express";
import multer from "multer";
import { registerUsers } from "../controller/register.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("profilePicture"), registerUsers);

export default router;
