import express from "express";
import cors from "cors";
import xssClean from "xss-clean";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { router as studentRouter } from "./routers/studentRoutes.js";
import { router as eventRouter } from "./routers/eventRoutes.js";
import { router as qrRouter } from "./routers/qrRoutes.js";
import { router as paymentRouter } from "./routers/paymentRoutes.js";

const app = express();

app.use(cors());

// Parse incoming requests with JSON payloads and set a size limit of 16KB
app.use(express.json({ limit: "16kb" }));

// Parse cookies from the request headers and make them accessible in req.cookies
app.use(cookieParser());

// Use Helmet middleware for basic security headers
app.use(helmet());

// XSS protection middleware
app.use(xssClean());

// Routes
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/qr", qrRouter);
app.use("/api/v1", paymentRouter);


export { app };
