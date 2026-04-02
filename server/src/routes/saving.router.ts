import { Router } from "express";
import SavingController from "../controllers/Saving.controller";

export default Router()
  .get("/", SavingController.getSaving)
  .patch("/", SavingController.updateSaving);

