import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

const verifyAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided" });
    return;
  }
  if (!JWT_SECRET) {
    res.status(500).json({ message: "JWT secret key is not configured." });
    return;
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }
    req.user = user;
    next();
  });
};

export default verifyAdminToken;
