import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

taskSchema.index({ user: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
