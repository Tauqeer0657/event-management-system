import express from "express";
import { addStudent } from "../controllers/studentControllers.js";
const router = express.Router();

router.route("/addStudent").post(addStudent);

export { router };