import type { Request, Response } from "express";
import TransactionService from "../service/Transaction.service";
import formatResponse from "../utils/formatResponse";
import CategoryService from "../service/Category.service";

export default class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const { budget_id, budget_limit, name } = req.body;
    try {
      const newCategory = await CategoryService.createNewCategory({
        budget_id,
        budget_limit,
        name,
      });
      return res.status(201).json(formatResponse(201, "Created", newCategory));
    } catch (error) {
      console.log("==== CategoryController.createCategory ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const { id: category_id } = req.params;
    const { budget_limit, name } = req.body;

    try {
      const updatedCategory = await CategoryService.updateCategoryById(
        Number(category_id),
        { name, budget_limit },
      );
      return res.status(200).json(formatResponse(200, "OK", updatedCategory));
    } catch (error) {
      console.log("==== CategoryController.updateCategory ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async getTransactions(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const transactions = await TransactionService.getAllTransactions(
        Number(id),
      );
      return res.status(200).json(formatResponse(200, "OK", transactions));
    } catch (error) {
      console.log("==== CategoryController.getTransactions ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}
