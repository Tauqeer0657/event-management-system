import express from "express";
import { createSession } from "../controllers/paymentControllers.js";

const router = express.Router();

// Route to create checkout session
router.route("/create-checkout-session").post(createSession);

export { router };