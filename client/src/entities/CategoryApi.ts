import type {
  CreateCategoryDTO,
  TransactionDTO,
  UpdateCategoryDTO,
} from "../../../server/src/types/database.types";
import { axiosInstance } from "../shared/lib/axiosInstance";

export default class CategoryApi {
  static async createCategory(data: CreateCategoryDTO) {
    try {
      const response = await axiosInstance.post("/category", data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateCategory(category_id: number, data: UpdateCategoryDTO) {
    try {
      const response = await axiosInstance.patch(
        `/category/${category_id}`,
        data,
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getTransactions(category_id: number): Promise<TransactionDTO[]> {
    try {
      const response = await axiosInstance.get(
        `/category/${category_id}/transactions`,
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
