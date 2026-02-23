import { Router } from "express";
import authRouter from "./auth.routes";
import budgetRouter from "./Budget.router";
import formatResponse from "../utils/formatResponse";
import transactionRouter from "./transaction.router";
import { verifyAccessToken } from "../middleware/verifyAccessToken";

export default Router()
.use("/auth", authRouter)
.use('/budget', verifyAccessToken, budgetRouter)
.use('/transaction', verifyAccessToken, transactionRouter)
.use((req, res) => {
  return res.status(404).json(formatResponse(404, "Ресурс не найден"));
});