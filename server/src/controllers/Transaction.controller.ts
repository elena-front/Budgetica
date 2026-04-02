import CategoryService from "../service/Category.service";
import TransactionService from "../service/Transaction.service";
import formatResponse from "../utils/formatResponse";
import type { Response, Request } from "express";

export default class TransactionController {
  static async createNewTransaction(req: Request, res: Response) {
    const { category_id, amount } = req.body;
    if (!(await CategoryService.getCategoryById(category_id)))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Такая категория не существует",
            null,
            "Такая категория не существует",
          ),
        );

    if (amount <= 0) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Сумма трензакции должна быть больше 0",
            null,
            "Сумма трензакции должна быть больше 0",
          ),
        );
    }

    try {
      const newTransaction = await TransactionService.createNewTransaction({
        category_id,
        amount,
      });
      return res
        .status(201)
        .json(
          formatResponse(201, "Транзакция успешно создана", newTransaction),
        );
    } catch (error) {
      console.log("==== TransactionController.createTransaction ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

// POST /api/transactions

// {
//     "category_id": 1,
//     "amount": 1000,
// }
