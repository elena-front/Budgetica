import type { Response, Request } from "express";
import BudgetService from "../service/Budget.service";
import CategoryService from "../service/Category.service";
import formatResponse from "../utils/formatResponse";

export default class BudgetController {
  static async createNewBudget(req: Request, res: Response) {
    const { month, year, total_amount } = req.body;
    const user_id = res.locals.user.id;
    try {
      const existingBudget = (await BudgetService.getBudgetByUserId(user_id))
        .map((budget) => budget.get())
        .find(
          (budget) =>
            budget.month === Number(month) && budget.year === Number(year),
        );

      if (existingBudget) {
        const categories = (
          await CategoryService.getAllCategory(existingBudget.id)
        ).map((category) => category.get());

        return res.status(200).json(
          formatResponse(200, "Бюджет уже существует", {
            ...existingBudget,
            categories,
          }),
        );
      }

      const newBudget = await BudgetService.createNewBudget({
        user_id,
        month,
        year,
        total_amount,
      });
      const categories = await Promise.all(
        ["🏠 Коммунальные", "📚 Школа/секции", "🛒 Еда", "⛽ Бензин"].map(
          async (name) =>
            await CategoryService.createNewCategory({
              budget_id: newBudget.id,
              name: name,
              budget_limit: 0,
            }),
        ),
      );
      return res.status(201).json(
        formatResponse(201, "Бюджет создан", {
          ...newBudget,
          categories: categories,
        }),
      );
    } catch (error) {
      console.log("==== BudgetController.createBudget ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async getBudget(req: Request, res: Response) {
    const { month, year } = req.query;
    const user_id = res.locals.user.id;
    try {
      const myBudget = (await BudgetService.getBudgetByUserId(user_id))
        .map((budget) => budget.get())
        .find(
          (budget) =>
            budget.month === Number(month) && budget.year === Number(year),
        );
      if (!myBudget) {
        return res
          .status(404)
          .json(
            formatResponse(404, "Бюджет не найден", null, "Бюджет не найден"),
          );
      }

      const categories = (
        await CategoryService.getAllCategory(myBudget.id)
      ).map((category) => category.get());

      return res.status(200).json(
        formatResponse(200, "Запрос успешно выполнен", {
          ...myBudget,
          categories,
        }),
      );
    } catch (error) {
      console.log("==== BudgetController.getBudget ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}
/**

GET /api/budgets

const budgets = [
    {
        "id": 1,
        "month": 2,
        "year": 2026
    }, {

    }
     
]


GET /api/budget/:id

const response = {
    "id": 1,
    "month": 2,
    "year": 2026,
    "total_amount": 150000,
    "spent": 47200,
    "savings_amount": 50000,
    "categories": [
        {
            "id": 1,
            "name": "Коммунальные",
            "limit": 25000,
            "spent": 25000,
        }, {
            "id": 2,
            "name": "Еда",
            "limit": 35000,
            "spent": 5200,
        }
    ]
}


POST /api/transactions

{
    "category_id": 1,
    "amount": 1000,
}



**/
