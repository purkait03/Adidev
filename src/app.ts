import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { slowDown } from 'express-slow-down'

const app = express();

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 30,
    delayMs: (used, req) => {
        let extraRequests = used - 30
        // return Math.min(extraRequests * 100, 2000)
        return extraRequests * 100
    },
    maxDelayMs: 2000,
})


const globalHardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7', 
  legacyHeaders: false, 
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: 'Too many login attempts, please try again in a minute.',
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(speedLimiter)
app.use(globalHardLimiter)

// Routers
import folderRouters from "./routers/folder.routes.js"
import fileRouters from "./routers/file.routes.js"

app.use("/app/v1/folder", folderRouters)
app.use("/app/v1/file", fileRouters)

export { app }
