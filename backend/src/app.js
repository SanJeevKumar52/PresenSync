import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from 'morgan';

import rateLimit from "express-rate-limit";

import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import taskRoutes from "./routes/task.routes.js";


const app = express();

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

//Rate Limiting

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

// Health route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running ",
    });
});
app.use("/api/auth",authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);

// Error middleware
app.use(errorHandler);

export default app;
