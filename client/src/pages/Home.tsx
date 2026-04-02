import { useEffect, useState } from "react";
import type { BudgetDTO, CategoryDTO, SavingDTO, TransactionDTO } from "../types/database.types";
import CategoryWidget from "../components/CategoryWidget";
import BudgetApi from "../entities/BudgetApi";
import CategoryApi from "../entities/CategoryApi";
import SavingApi from "../entities/SavingApi";

export default function Home() {
  const [budget, setBudget] = useState<BudgetDTO>();
  const [saving, setSaving] = useState<SavingDTO | null>(null);

  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  function handleCategoryUpdated(updatedCategory: CategoryDTO) {
    setBudget((current) => ({
      ...current!,
      categories: current!.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    }));
  }

  function handleTransactionAdded(addedTransaction: TransactionDTO) {
    setTransactions((current) => [...current, addedTransaction]);
  }

  useEffect(() => {
    async function loadBudget() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      const loadedBudget =
        (await BudgetApi.getBudget(year, month)) ||
        (await BudgetApi.createNewBudget({ month, year, total_amount: 0 }));
      setBudget(loadedBudget);

      const loadedTransactions = (
        await Promise.all(
          loadedBudget.categories.map(
            async (category) => await CategoryApi.getTransactions(category.id),
          ),
        )
      ).flatMap((list) => list);
      setTransactions(loadedTransactions);

      const loadedSaving = await SavingApi.getSaving();
      setSaving(loadedSaving);
    }

    loadBudget();
  }, []);

  if (!budget) {
    return <></>;
  }

  const total_spent = transactions.reduce((acc, next) => acc + next.amount, 0);
  const total_remain = budget.total_amount - total_spent;

  return (
    <>
      <h1>
        Бюджет -{" "}
        {new Date(budget.year, budget.month - 1, 1).toLocaleDateString(
          "ru-RU",
          {
            month: "2-digit",
            year: "numeric",
          },
        )}
      </h1>

      {/* виджет с бюджетом */}
      <div>
        <div>
          <span>Общий бюджет</span>
        </div>
        <div>
          <span>Бюджет на месяц</span>
          <span>{budget.total_amount}</span>
        </div>
        <div>
          <span>Потрачено</span>
          <span>{total_spent}</span>
        </div>
        <div>
          <span>Сбережения</span>
          <span>{saving?.amount ?? 0}</span>
        </div>
        {total_remain >= 0 && (
          <div>
            <span>Остаток</span>
            <span>{total_remain}</span>
          </div>
        )}
        {total_remain < 0 && (
          <div>
            <span>Перерасход</span>
            <span>{-total_remain}</span>
          </div>
        )}
      </div>

      <h2>Категории расходов</h2>
      <div>
        {budget.categories.map((category) => (
          <CategoryWidget
            category={category}
            transactions={transactions.filter(
              (transaction) => transaction.category_id === category.id,
            )}
            onCategoryUpdated={handleCategoryUpdated}
            onTransactionAdded={handleTransactionAdded}
          />
        ))}
      </div>
    </>
  );
}
