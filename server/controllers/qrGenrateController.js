import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getSqlRequest, sql } from "../db/connection.js";

const qrGenrate = asyncHandler(async (req, res) => {

  const request = getSqlRequest();

  console.log(request);
  

 
});












export { qrGenrate };
