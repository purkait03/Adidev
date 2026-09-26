import express from "express";
import cors from "cors";
import { rateLimiter } from "./middlewares/rate-limit.middleware.js";

const app = express();



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(rateLimiter.speedLimiter)
app.use(rateLimiter.globalHardLimiter)

// Routers
import folderRouters from "./routers/folder.routes.js"
import fileRouters from "./routers/file.routes.js"

app.use("/app/v1/folder", folderRouters)
app.use("/app/v1/file", fileRouters)

export { app }
