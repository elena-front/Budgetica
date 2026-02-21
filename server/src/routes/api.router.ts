import { Router } from "express";
import authRouter from "./auth.routes";

export default Router().use("/auth", authRouter);
