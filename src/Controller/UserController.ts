import { Request, Response } from "express";
import User from "../Models/UserModels"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body; 

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword }); 
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};
