import morgan from "morgan";
import type { Application } from "express";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import removeXPoweredByHeader from "../middleware/removeHeader";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
};

const serverConfig = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(removeXPoweredByHeader);
  app.use(express.static(path.join(__dirname, "../public")));
};

export default serverConfig;
