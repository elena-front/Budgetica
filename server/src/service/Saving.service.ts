import { Saving } from "../db/models";
import type { CreateSavingDTO } from "../types/database.types";

export default class SavingService {
      static async createNewBudget(budgetData: CreateSavingDTO) {
        return (await Saving.create(budgetData))?.get();
      }

        static async updateSavingById(id: number, amount:number) {
          const budgetToUpdate = await Saving.findByPk(id);
      
          if(!budgetToUpdate) return null;
      
          budgetToUpdate.amount = amount;
          await budgetToUpdate.save();
      
          return budgetToUpdate;
        }
}