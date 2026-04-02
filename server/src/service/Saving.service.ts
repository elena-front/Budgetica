import { Saving } from "../db/models";
import type { CreateSavingDTO } from "../types/database.types";

export default class SavingService {
  static async getSavingByUserId(user_id: number) {
    return await Saving.findOne({ where: { user_id } });
  }

  static async createSaving(savingData: CreateSavingDTO) {
    return (await Saving.create(savingData)).get();
  }

  static async updateSavingByUserId(user_id: number, amount: number) {
    const savingToUpdate = await SavingService.getSavingByUserId(user_id);
    if (!savingToUpdate) return null;

    savingToUpdate.amount = amount;
    await savingToUpdate.save();

    return savingToUpdate.get();
  }
}