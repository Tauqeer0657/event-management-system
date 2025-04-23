import express from "express";
import { qrGenrate } from "../controllers/qrGenrateController.js";

const router = express.Router();

// Route to generate QR based on cardId
router.route("/qrGenrate").post(qrGenrate);

export { router };
