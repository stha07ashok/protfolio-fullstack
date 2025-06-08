import express from "express";
import { getAdmin } from "../controller/user.controller";

export const userRouter = express.Router();

userRouter.post("/login", getAdmin);
