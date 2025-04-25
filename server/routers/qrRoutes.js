import express from "express";
import { generateQr } from "../controllers/qrController.js";

const router = express.Router();

// Route to generate QR code
router.route("/generateQr").post(generateQr);

export { router };
