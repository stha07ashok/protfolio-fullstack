import express, { Request, Response } from "express";
import { getMessages, postMessage } from "../controller/message.controller";

export const userMessage = express.Router();

userMessage.get("/getMessage", getMessages);
userMessage.post("/postMessage", postMessage);
