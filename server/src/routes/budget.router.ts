import { Router } from "express";
import BudgetController from "../controllers/Budget.controller";

export default Router()
  .post("/", BudgetController.createNewBudget)
  .get("/", BudgetController.getBudget);
