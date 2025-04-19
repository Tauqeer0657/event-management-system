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

// Api to get users
const getUsers = asyncHandler(async (req, res) => {
  const request = getSqlRequest();

  const query = `SELECT * FROM tb_gl_forms_users
              WHERE company_id = @company_id`;
    request.input("company_id", sql.NVarChar, req.user.company_id);

  const result = await request.query(query);

  if (result.recordset.length === 0) {
    throw new ApiError(404, "No Users found");
  }

  return res.status(200).json(new ApiResponse(200, { Users: result.recordset }, "Users fetched successfully"));
});

// Api to get User by id
const getUserById = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new ApiError(400, "Please provide User Id");
  }

  const request = getSqlRequest();

  request.input("user_id", sql.NVarChar, user_id);

  const query = "SELECT * FROM tb_gl_forms_users WHERE user_id = @user_id";
  const result = await request.query(query);

  if (result.recordset.length === 0) {
    throw new ApiError(404, "No User found");
  }

  const user = result.recordset[0];

  if( req.user.role === "admin" && user.company_id !== req.user.company_id){
    throw new ApiError(403, "Access Denied");
  }

  return res.status(200).json(new ApiResponse(200, { User: user }, "User fetched successfully"));
});

// Api to delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new ApiError(400, "Please provide User Id");
  }

  const request = getSqlRequest();

  request.input("user_id", sql.NVarChar, user_id);
  const checkQuery = "SELECT * FROM tb_gl_forms_users WHERE user_id = @user_id";
  const checkResult = await request.query(checkQuery);

  if (checkResult.recordset.length === 0) {
    throw new ApiError(404, "No User found");
  }

  const user = checkResult.recordset[0];

  if (req.user.role === "admin" && user.company_id !== req.user.company_id) {
    throw new ApiError(403, "Access denied");
  }

  const deleteQuery = "DELETE FROM tb_gl_forms_users WHERE user_id = @user_id";
  const result = await request.query(deleteQuery);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export { addStudent, getUsers, getUserById, deleteUser};
