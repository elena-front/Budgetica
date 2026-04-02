export type CreateBudgetDTO = {
  user_id: number;
  month: number;
  year: number;
  total_amount: number;
};

export type BudgetDTO = {
  id: number;
  user_id: number;
  month: number;
  year: number;
  total_amount: number;
  createdAt: Date;
  updatedAt: Date;
  categories: CategoryDTO[];
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

export type CategoryDTO = {
  id: number;
  budget_id: number;
  name: string;
  budget_limit: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateSavingDTO = {
  user_id: number;
  amount: number;
};

// Note: backend model currently stores user_id on Savings.
export type SavingDTO = {
  id: number;
  user_id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTransactionDTO = {
  category_id: number;
  amount: number;
};

export type TransactionDTO = {
  id: number;
  category_id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

