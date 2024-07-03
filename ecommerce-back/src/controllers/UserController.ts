import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../../database.sqlite");

export class UserController {
  static register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = userRepository.create({
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}
