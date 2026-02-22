import Task from "../models/task.model.js";
import { validationResult } from "express-validator";

// Create Task
export const createTask = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const task = await Task.create({
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
        });

        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

// Get Tasks (with pagination bonus)
export const getTasks = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const tasks = await Task.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

// Update Task
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id, // ownership validation
        });

        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        task.title = req.body.title ?? task.title;
        task.description = req.body.description ?? task.description;
        task.status = req.body.status ?? task.status;

        const updatedTask = await task.save();

        res.status(200).json({
            success: true,
            data: updatedTask,
        });
    } catch (error) {
        next(error);
    }
};