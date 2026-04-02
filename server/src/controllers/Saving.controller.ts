import type { Request, Response } from "express";
import SavingService from "../service/Saving.service";
import formatResponse from "../utils/formatResponse";

export default class SavingController {
  static async getSaving(req: Request, res: Response) {
    const user_id = res.locals.user.id;
    try {
      let saving = await SavingService.getSavingByUserId(user_id);

      if (!saving) {
        saving = await SavingService.createSaving({ user_id, amount: 0 });
        return res.status(201).json(formatResponse(201, "Сбережения созданы", saving));
      }

      return res.status(200).json(formatResponse(200, "OK", saving.get()));
    } catch (error) {
      console.log("==== SavingController.getSaving ==== ");
      console.log(error);
      return res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async updateSaving(req: Request, res: Response) {
    const user_id = res.locals.user.id;
    const { amount } = req.body;

    if (typeof amount !== "number" || amount < 0) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Сумма сбережений должна быть числом больше или равна 0",
            null,
            "Сумма сбережений должна быть числом больше или равна 0",
          ),
        );
    }

    try {
      const existing = await SavingService.getSavingByUserId(user_id);
      if (!existing) {
        const newSaving = await SavingService.createSaving({ user_id, amount });
        return res
          .status(201)
          .json(formatResponse(201, "Сбережения созданы", newSaving));
      }

      const updatedSaving = await SavingService.updateSavingByUserId(
        user_id,
        amount,
      );
      return res.status(200).json(formatResponse(200, "OK", updatedSaving));
    } catch (error) {
      console.log("==== SavingController.updateSaving ==== ");
      console.log(error);
      return res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

