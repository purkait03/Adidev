import express from "express";
import cors from "cors";
import cookieparser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(cookieparser());

// Routers
import folderRouters from "./routers/folder.routes.js"
import fileRouters from "./routers/file.routes.js"
import adminRouter from "./routers/admin.routes.js"

app.use("/app/v1/folder", folderRouters);
app.use("/app/v1/file", fileRouters);
app.use("/app/v1/admin",adminRouter);

export { app }
