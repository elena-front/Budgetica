import { Router } from "express";
import CategoryController from "../controllers/Category.controller";

export default Router()
  .post("/", CategoryController.createCategory)
  .patch("/:id", CategoryController.updateCategory)
  .get("/:id/transactions", CategoryController.getTransactions);
