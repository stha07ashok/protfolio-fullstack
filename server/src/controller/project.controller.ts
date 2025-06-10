import { Request, Response } from "express";
import { Project } from "../models/project.model";
import cloudinary from "../utils/cloudinary";
import { UploadedFile } from "express-fileupload";

export const addProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, category, description, stack, liveUrl, githubUrl } =
      req.body;

    // Check for uploaded file
    if (!req.files || !req.files.image) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    const imageFile = req.files.image as UploadedFile;

    const uploadResult = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "projects",
      }
    );

    const project = await Project.create({
      title,
      category,
      description,
      stack: JSON.parse(stack),
      image: uploadResult.secure_url,
      liveUrl,
      githubUrl,
    });

    res.status(201).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
