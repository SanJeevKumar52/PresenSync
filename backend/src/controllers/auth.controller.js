import User from "../models/user.model";
import generateToken from "../utils/generateToken";
import { validationResult } from "express-validator";


//signup 

export const signup = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            data: {
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });

    } catch (error) {
        next(error);
    }
}

//login

export const login = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            res.status(401);
            throw new Error("Invalid Credentials");
        }

        res.status(200).json({
            success: true,
            data: {
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
            },
        });

    } catch (error) {
        next(error);
    }

};