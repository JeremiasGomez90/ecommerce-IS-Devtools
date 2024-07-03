import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line
  console.log({ headers: req.headers.authorization });
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as any;
    req.userId = decoded.id;
    // eslint-disable-next-line
    console.log({ id: decoded.id, email: decoded.email });
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
