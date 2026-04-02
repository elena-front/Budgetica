import { axiosInstance } from "../shared/lib/axiosInstance";
import type { SavingDTO } from "../types/database.types";

export default class SavingApi {
  static async getSaving(): Promise<SavingDTO> {
    try {
      const response = await axiosInstance.get("/saving");
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateSaving(amount: number): Promise<SavingDTO> {
    try {
      const response = await axiosInstance.patch("/saving", { amount });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

