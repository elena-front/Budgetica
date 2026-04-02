import type { InferAttributes } from "sequelize";
import type { Budget, Category, Saving, Transaction } from "../db/models";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type CreateBudgetDTO = {
  user_id: number;
  month: number;
  year: number;
  total_amount: number;
};

export type CreateCategoryDTO = {
  budget_id: number;
  name: string;
  budget_limit: number;
};

export type UpdateCategoryDTO = {
  name: string;
  budget_limit: number;
};

export type CreateSavingDTO = {
  budget_id: number;
  amount: number;
};

export type CreateTransactionDTO = {
  category_id: number;
  amount: number;
};

export type BudgetDTO = InferAttributes<Budget> & {
  categories: InferAttributes<Category>[];
};

export type CategoryDTO = InferAttributes<Category>;

export type SavingDTO = InferAttributes<Saving>;

export type TransactionDTO = InferAttributes<Transaction>;

export type SingupData = {
  name: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};
