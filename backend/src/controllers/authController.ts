import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// REGISTER
export const register = async (req: Request, res: Response) => {
    try{
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashed });
        res.json({ message: "User registered", user: { id: user._id, name: user.name, email: user.email } });
    }catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}