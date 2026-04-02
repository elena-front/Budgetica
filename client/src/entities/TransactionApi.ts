import type { TransactionDTO } from "../types/database.types";
import { axiosInstance } from "../shared/lib/axiosInstance";

export default class TransactionApi {
  static async createTransaction(
    category_id: number,
    amount: number,
  ): Promise<TransactionDTO> {
    try {
      const response = await axiosInstance.post("/transaction", {
        category_id,
        amount,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
