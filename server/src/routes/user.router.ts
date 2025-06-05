import express from "express";
import { getAdmin } from "../controller/user.controller";
import verifyAdminToken from "../middleware/verifyAdminToken";

export const userRouter = express.Router();

userRouter.post("/login", getAdmin);
