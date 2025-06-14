import { Router } from "express";
import { addProject, getAllProjects } from "../controller/project.controller";
import verifyAdminToken from "../middleware/verifyAdminToken";

const projectRouter = Router();

projectRouter.post("/addproject", verifyAdminToken, addProject);
projectRouter.get("/getallprojects", verifyAdminToken, getAllProjects);

export default projectRouter;
