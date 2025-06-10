import { Request, Response } from "express";
import Message from "../models/message.model";

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const messages = await Message.findAll();
    res
      .status(200)
      .json({ message: "Messages fetched successfully", data: messages });
  } catch (error) {
    console.error("Get Message Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const postMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      Name,
      Email,
      Phone,
      Address,
      Message: messageText,
      Service,
      DateTime,
    } = req.body;

    if (!Name || !Email || !messageText) {
      res.status(400).json({ error: "Name, Email and Message are required." });
      return;
    }

    const newMessage = await Message.create({
      Name,
      Email,
      Phone,
      Address,
      MessageText: messageText,
      Service,
      DateTime: DateTime ? new Date(DateTime) : new Date(),
    });

    res
      .status(201)
      .json({ message: "Message saved successfully", data: newMessage });
  } catch (error) {
    console.error("Post Message Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
