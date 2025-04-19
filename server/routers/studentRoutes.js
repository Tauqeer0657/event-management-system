import express from "express";
import { addStudent, getStudents, getStudentById } from "../controllers/studentControllers.js";
const router = express.Router();

// Router to add student
router.route("/addStudent").post(addStudent);

// Router to get students
router.route("/getStudents").get(getStudents);

// Router to get student by id
router.route("/getStudentById/:student_id").get(getStudentById);

export { router };