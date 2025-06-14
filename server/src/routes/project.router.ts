import { Router } from "express";
import {
  addProject,
  getAllProjects,
  getAllProjectsFrontend,
} from "../controller/project.controller";
import verifyAdminToken from "../middleware/verifyAdminToken";

const projectRouter = Router();

projectRouter.post("/addproject", verifyAdminToken, addProject);
projectRouter.get("/getallprojects", verifyAdminToken, getAllProjects);
projectRouter.get("/getallprojectsfrontend", getAllProjectsFrontend);

export default projectRouter;
