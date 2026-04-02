import { Router } from "express";
import authRouter from "./auth.routes";
import budgetRouter from "./budget.router";
import formatResponse from "../utils/formatResponse";
import transactionRouter from "./transaction.router";
import { verifyAccessToken } from "../middleware/verifyAccessToken";
import categoryRouter from "./category.router";

export default Router()
  .use("/auth", authRouter)
  .use("/budget", verifyAccessToken, budgetRouter)
  .use("/transaction", verifyAccessToken, transactionRouter)
  .use("/category", verifyAccessToken, categoryRouter)
  .use((req, res) => {
    return res.status(404).json(formatResponse(404, "Ресурс не найден"));
  });
