import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getSqlRequest, sql } from "../db/connection.js";
import jwt from 'jsonwebtoken';
import { sendEmailForUserCreation } from "../utils/emailServices.js";
import QRCode from "qrcode";

const qrGenrate = asyncHandler(async (req, res) => {
  const { student_id, event_id } = req.body;

  if (!student_id || !event_id) {
    throw new ApiError(400, "student_id and event_id are required");
  }

  const request = getSqlRequest();

  request.input("student_id", sql.NVarChar, student_id);
  request.input("event_id", sql.NVarChar, event_id);

  const query = `
    SELECT 
      s.student_id, 
      s.fullName AS student_name, 
      s.email AS student_email,
      e.event_id, 
      e.event_name, 
      e.description AS event_description, 
      e.event_date AS event_time, 
      e.location AS event_venue
    FROM 
      tb_student s
    JOIN 
      tb_event e ON e.event_id = @event_id
    WHERE 
      s.student_id = @student_id
  `;

  const result = await request.query(query);

  if (result.recordset.length === 0) {
    throw new ApiError(404, "No matching student or event found");
  }

  const {
    student_id: sid,
    student_name,
    student_email,
    event_id: eid,
    event_name,
    event_description,
    event_time,
    event_venue
  } = result.recordset[0];

  const payload = {
    student_id: sid,
    student_name,
    student_email,
    event_id: eid,
    event_name,
    event_description,
    event_time,
    event_venue
  };

  // Generate token
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  const qrCodeImage = await QRCode.toDataURL(token, {
    width: 500,
    errorCorrectionLevel: 'L'
  });

 // Send email with event details and token
  await sendEmailForUserCreation(
    student_email,
    student_name,
    event_name,
    event_description,
    event_venue,
    event_time,
    qrCodeImage
  );

  return res.status(200).json(
    new ApiResponse(200, { ...payload, token }, "QR code generated and sent on an email")
  );
});

export { qrGenrate };
