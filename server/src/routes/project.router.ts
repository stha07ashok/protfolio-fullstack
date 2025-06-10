import { Router } from "express";
import { addProject } from "../controller/project.controller";

const projectRouter = Router();

projectRouter.post("/addproject", addProject);

export default projectRouter;
