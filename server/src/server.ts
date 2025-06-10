import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initializeDatabase } from "./database/dbConnection";
import { userRouter } from "./routes/user.router";
import { userMessage } from "./routes/message.router";
import projectRouter from "./routes/project.router";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/admin", userRouter);
app.use("/admin/message", userMessage);
app.use("/admin", projectRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  initializeDatabase();
});
