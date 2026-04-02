import { Router } from "express";
import TransactionController from "../controllers/Transaction.controller";

export default Router().post("/", TransactionController.createNewTransaction);
