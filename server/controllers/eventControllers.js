import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getSqlRequest, sql } from "../db/connection.js";

// Api to add Event
const addEvent = asyncHandler(async (req, res) => {
  const request = getSqlRequest();

  // Add required inputs based on Event table
  request.input("event_id", sql.NVarChar, req.body.event_id);
  request.input("event_name", sql.NVarChar, req.body.event_name);
  request.input("event_date", sql.Date, req.body.event_date);
  request.input("location", sql.NVarChar, req.body.location);
  request.input("organized_by", sql.NVarChar, req.body.organized_by);
  request.input("description", sql.NVarChar, req.body.description);

  // SQL query for insertion
  const query = `
    INSERT INTO tb_event (
      event_id, event_name, event_date, location, organized_by,
      description)
      VALUES (
      @event_id, @event_name, @event_date, @location, @organized_by,
      @description)
  `;

  await request.query(query);

  return res
    .status(201)
    .json(new ApiResponse(201, { Event_id: req.body.event_id }, "Event added successfully"));
});

// Api to get Events
const getEvents = asyncHandler(async (req, res) => {
  const request = getSqlRequest();

  const query = `SELECT * FROM tb_Event`;

  const result = await request.query(query);

  if (result.recordset.length === 0) {
    throw new ApiError(404, "No Events found");
  }

  return res.status(200).json(new ApiResponse(200, { Events: result.recordset }, "Events fetched successfully"));
});

export { addEvent, getEvents };
