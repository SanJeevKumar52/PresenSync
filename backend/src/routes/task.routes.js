import express from "express";
import { body } from "express-validator";
import protect from "../middlewares/auth.middleware.js";
import {
    createTask,
    getTasks,
    updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post(
    "/",
    protect,
    [body("title").notEmpty().withMessage("Title is required")],
    [body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Invalid status value")],
    createTask
);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

export default router;