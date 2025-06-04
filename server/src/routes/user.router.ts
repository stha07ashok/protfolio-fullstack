import express from "express";
import { getAdmin, logout } from "../controller/user.controller";
import verifyAdminToken from "../middleware/verifyAdminToken";

export const userRouter = express.Router();

userRouter.post("/login", getAdmin);
userRouter.post("/logout", logout);
