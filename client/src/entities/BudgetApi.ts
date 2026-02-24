import { axiosInstance } from "../shared/lib/axiosInstance";
import type {
  BudgetDTO,
  CreateBudgetDTO,
} from "../../../server/src/types/database.types";
import type { AxiosError } from "axios";

export default class BudgetApi {
  static async createNewBudget(
    budgetData: Omit<CreateBudgetDTO, "user_id">,
  ): Promise<BudgetDTO> {
    try {
      const response = await axiosInstance.post("/budget", budgetData);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getBudget(
    year: number,
    month: number,
  ): Promise<BudgetDTO | null> {
    try {
      const response = await axiosInstance.get(
        `/budget?month=${month}&year=${year}`,
      );
      return response.data.data;
    } catch (error) {
      if ((error as AxiosError).status === 404) {
        return null;
      }
      console.error(error);
      throw error;
    }
  }
}
