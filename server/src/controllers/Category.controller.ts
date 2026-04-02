import type { Request, Response } from "express";
import TransactionService from "../service/Transaction.service";
import formatResponse from "../utils/formatResponse";
import CategoryService from "../service/Category.service";
import BudgetService from "../service/Budget.service";

export default class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const { budget_id, budget_limit, name } = req.body;
    const user_id = res.locals.user.id;

    try {
      const userBudget = await BudgetService.getBudgetByIdAndUserId(
        Number(budget_id),
        user_id,
      );
      if (!userBudget) {
        return res.status(403).json(
          formatResponse(
            403,
            "Нет доступа к этому бюджету",
            null,
            "Нет доступа к этому бюджету",
          ),
        );
      }

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
    const user_id = res.locals.user.id;

    try {
      const existingCategory = await CategoryService.getCategoryById(
        Number(category_id),
      );
      if (!existingCategory) {
        return res
          .status(404)
          .json(formatResponse(404, "Категория не найдена"));
      }

      const userBudget = await BudgetService.getBudgetByIdAndUserId(
        Number(existingCategory.budget_id),
        user_id,
      );
      if (!userBudget) {
        return res.status(403).json(
          formatResponse(
            403,
            "Нет доступа к этой категории",
            null,
            "Нет доступа к этой категории",
          ),
        );
      }

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
    const user_id = res.locals.user.id;

    try {
      const existingCategory = await CategoryService.getCategoryById(Number(id));
      if (!existingCategory) {
        return res
          .status(404)
          .json(formatResponse(404, "Категория не найдена"));
      }

      const userBudget = await BudgetService.getBudgetByIdAndUserId(
        Number(existingCategory.budget_id),
        user_id,
      );
      if (!userBudget) {
        return res.status(403).json(
          formatResponse(
            403,
            "Нет доступа к этой категории",
            null,
            "Нет доступа к этой категории",
          ),
        );
      }

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
