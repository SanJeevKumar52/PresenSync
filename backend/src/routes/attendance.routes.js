import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  markAttendance,
  getAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);
router.get("/", protect, getAttendance);

export default router;