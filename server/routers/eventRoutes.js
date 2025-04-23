import express from "express";
import { addEvent, getEvents } from "../controllers/eventControllers.js";
const router = express.Router();

// Router to add event
router.route("/addEvent").post(addEvent);

// Router to get events
router.route("/getEvents").get(getEvents);

export { router };