import Attendance from "../models/attendance.model.js";

// Mark Attendance
export const markAttendance = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.create({
      user: userId,
      date: today,
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      res.status(400);
      return next(new Error("Attendance already marked for today"));
    }

    next(error);
  }
};

// Get Attendance History
export const getAttendance = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const records = await Attendance.find({ user: userId }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};