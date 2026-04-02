import { Budget } from "../db/models";
import type { CreateBudgetDTO } from "../types/database.types";

export default class BudgetService {
  static async getBudgetByUserId(user_id: number) {
    return (await Budget.findAll({ where: { user_id } }));
  }

  static async createNewBudget(budgetData: CreateBudgetDTO) {
    return (await Budget.create(budgetData))?.get();
  }

  static async updateBudgetById(id: number, total_amount:number) {
    const budgetToUpdate = await Budget.findByPk(id);

    if(!budgetToUpdate) return null;

    budgetToUpdate.total_amount = total_amount;
    await budgetToUpdate.save();

    return budgetToUpdate;
  }
}
