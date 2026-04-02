import type { BudgetDTO } from "../../../server/src/types/database.types";

export const budget: BudgetDTO = {
  id: 2,
  user_id: 1,
  month: 3,
  year: 2026,
  total_amount: 50000,
  createdAt: new Date("2026-02-22T18:18:56.366Z"),
  updatedAt: new Date("2026-02-22T18:18:56.366Z"),
  categories: [
    {
      id: 5,
      budget_id: 2,
      name: "🏠 Коммунальные",
      budget_limit: 0,
      createdAt: new Date("2026-02-22T18:18:56.501Z"),
      updatedAt: new Date("2026-02-22T18:18:56.501Z"),
    },
    {
      id: 6,
      budget_id: 2,
      name: "📚 Школа/секции",
      budget_limit: 0,
      createdAt: new Date("2026-02-22T18:18:56.501Z"),
      updatedAt: new Date("2026-02-22T18:18:56.501Z"),
    },
    {
      id: 7,
      budget_id: 2,
      name: "🛒 Еда",
      budget_limit: 0,
      updatedAt: new Date("2026-02-22T18:18:56.501Z"),
      createdAt: new Date("2026-02-22T18:18:56.501Z"),
    },
    {
      id: 8,
      budget_id: 2,
      name: "⛽ Бензин",
      budget_limit: 0,
      createdAt: new Date("2026-02-22T18:18:56.502Z"),
      updatedAt: new Date("2026-02-22T18:18:56.502Z"),
    },
  ],
};
