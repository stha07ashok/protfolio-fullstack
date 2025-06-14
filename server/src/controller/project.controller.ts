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

    // Validate image upload
    if (!req.files || !req.files.image) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    const imageFile = req.files.image as UploadedFile;

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "projects",
      }
    );

    // Parse stack array (e.g. JSON stringified array of { name: string })
    let parsedStack: string[];
    try {
      const rawStack = JSON.parse(stack);
      if (Array.isArray(rawStack)) {
        parsedStack = rawStack.map((item: any) =>
          typeof item === "object" && "name" in item ? item.name : String(item)
        );
      } else {
        parsedStack = [String(rawStack)];
      }
    } catch {
      parsedStack = [String(stack)];
    }

    const project = await Project.create({
      title,
      category,
      description,
      stack: parsedStack,
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

//Admin - get all projects
export const getAllProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]], // Optional: sort by newest first
    });

    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Frontend - Get All Projects
export const getAllProjectsFrontend = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]], // Optional: sort by newest first
    });

    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
