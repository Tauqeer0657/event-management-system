import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getSqlRequest, sql } from "../db/connection.js";

// Api to add Student
const addStudent = asyncHandler(async (req, res) => {
  const request = getSqlRequest();

  // Add required inputs based on student table
  request.input("student_id", sql.NVarChar, req.body.student_id);
  request.input("fullName", sql.NVarChar, req.body.fullName);
  request.input("roll_no", sql.NVarChar, req.body.roll_no);
  request.input("gender", sql.NVarChar, req.body.gender);
  request.input("nationality", sql.NVarChar, req.body.nationality);
  request.input("email", sql.NVarChar, req.body.email);
  request.input("phone_number", sql.NVarChar, req.body.phone_number || null);
  request.input("program", sql.NVarChar, req.body.program);
  request.input("department", sql.NVarChar, req.body.department || null);
  request.input("level", sql.NVarChar, req.body.level || null);
  request.input("created_at", sql.DateTime, new Date());
  request.input("updated_at", sql.DateTime, new Date());

  // SQL query for insertion
  const query = `
    INSERT INTO tb_student (
      student_id, fullName, roll_no, gender, nationality,
      email, phone_number, program, department, level,
      created_at, updated_at
    ) VALUES (
      @student_id, @fullName, @roll_no, @gender, @nationality,
      @email, @phone_number, @program, @department, @level,
      @created_at, @updated_at
    )
  `;

  await request.query(query);

  return res
    .status(201)
    .json(new ApiResponse(201, { student_id: req.body.student_id }, "Student added successfully"));
});

// Api to get students
const getStudents = asyncHandler(async (req, res) => {
  const request = getSqlRequest();

  const query = `SELECT * FROM tb_student`;

  const result = await request.query(query);

  if (result.recordset.length === 0) {
    throw new ApiError(404, "No Students found");
  }

  return res.status(200).json(new ApiResponse(200, { Students: result.recordset }, "Students fetched successfully"));
});

// Api to get student by id
const getStudentById = asyncHandler(async (req, res) => {
  const { student_id } = req.params;

  if (!student_id) {
    throw new ApiError(400, "Please provide Student Id");
  }

  const request = getSqlRequest();

  request.input("student_id", sql.NVarChar, student_id);

  const query = "SELECT * FROM tb_student WHERE student_id = @student_id";
  const result = await request.query(query);

  if (result.recordset.length === 0) {
    throw new ApiError(404, "No student found");
  }

  const student = result.recordset[0];

  return res.status(200).json(new ApiResponse(200, { Student: student }, "Student fetched successfully"));
});

export { addStudent, getStudents, getStudentById };
