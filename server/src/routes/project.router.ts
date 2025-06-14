import { Router } from "express";
import { addProject } from "../controller/project.controller";
import verifyAdminToken from "../middleware/verifyAdminToken";

const projectRouter = Router();

projectRouter.post("/addproject", verifyAdminToken, addProject);

export default projectRouter;
