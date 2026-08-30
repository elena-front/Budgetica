import type { Response, Request } from "express";
import BudgetService from "../service/Budget.service";
import CategoryService from "../service/Category.service";
import SavingService from "../service/Saving.service";
import TransactionService from "../service/Transaction.service";
import formatResponse from "../utils/formatResponse";

function getPreviousMonthPeriod(year: number, month: number) {
  if (month === 1) {
    return { year: year - 1, month: 12 };
  }

  return { year, month: month - 1 };
}

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

      const previousPeriod = getPreviousMonthPeriod(Number(year), Number(month));
      const previousBudget = (await BudgetService.getBudgetByUserId(user_id))
        .map((budget) => budget.get())
        .find(
          (budget) =>
            budget.month === previousPeriod.month &&
            budget.year === previousPeriod.year,
        );

      if (previousBudget) {
        const previousCategories = await CategoryService.getAllCategory(
          previousBudget.id,
        );
        const previousTransactions = (
          await Promise.all(
            previousCategories.map(async (category) =>
              await TransactionService.getAllTransactions(category.id),
            ),
          )
        ).flat();

        const previousSpent = previousTransactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0,
        );
        const previousRemain = previousBudget.total_amount - previousSpent;

        if (previousRemain > 0) {
          const saving = await SavingService.getSavingByUserId(user_id);

          if (!saving) {
            await SavingService.createSaving({
              user_id,
              amount: previousRemain,
            });
          } else {
            await SavingService.updateSavingByUserId(
              user_id,
              saving.amount + previousRemain,
            );
          }
        }
      }

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

  static async updateBudget(req: Request, res: Response) {
    const { total_amount } = req.body;
    const user_id = res.locals.user.id;
    const { month, year } = req.query;

    if (typeof total_amount !== "number" || total_amount < 0) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Общий бюджет должен быть числом больше или равным 0",
            null,
            "Общий бюджет должен быть числом больше или равным 0",
          ),
        );
    }

    try {
      const existingBudget = (await BudgetService.getBudgetByUserId(user_id))
        .map((budget) => budget.get())
        .find(
          (budget) =>
            budget.month === Number(month) && budget.year === Number(year),
        );

      if (!existingBudget) {
        return res
          .status(404)
          .json(
            formatResponse(404, "Бюджет не найден", null, "Бюджет не найден"),
          );
      }

      const updatedBudget = await BudgetService.updateBudgetById(
        existingBudget.id,
        total_amount,
      );

      const categories = (
        await CategoryService.getAllCategory(existingBudget.id)
      ).map((category) => category.get());

      return res.status(200).json(
        formatResponse(200, "Общий бюджет обновлен", {
          ...updatedBudget?.get(),
          categories,
        }),
      );
    } catch (error) {
      console.log("==== BudgetController.updateBudget ==== ");
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
