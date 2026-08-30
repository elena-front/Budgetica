import { useEffect, useState } from "react";
import type {
  BudgetDTO,
  CategoryDTO,
  SavingDTO,
  TransactionDTO,
} from "../types/database.types";
import CategoryWidget from "../components/CategoryWidget";
import AddCategory from "../components/AddCategory";
import SetBudgetTotal from "../components/SetBudgetTotal";
import BudgetApi from "../entities/BudgetApi";
import CategoryApi from "../entities/CategoryApi";
import SavingApi from "../entities/SavingApi";
import SpendingPieChart from "../components/SpendingPieChart";
import { Modal } from "../components/Modal";
import "./Home.css";

type BudgetHistoryItem = {
  id: number;
  label: string;
  total: number;
  spent: number;
  categories: Array<{
    id: number;
    name: string;
    spent: number;
    limit: number;
  }>;
};

function formatMonthLabel(year: number, month: number) {
  const monthName = new Date(year, month - 1, 1).toLocaleDateString("ru-RU", {
    month: "long",
  });

  return `${monthName[0].toUpperCase()}${monthName.slice(1)} ${year}`;
}

export default function Home() {
  const [budget, setBudget] = useState<BudgetDTO>();
  const [saving, setSaving] = useState<SavingDTO | null>(null);
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [budgetHistory, setBudgetHistory] = useState<BudgetHistoryItem[]>([]);
  const [budgetTab, setBudgetTab] = useState<"summary" | "transactions">(
    "summary",
  );
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [setBudgetModalOpen, setSetBudgetModalOpen] = useState(false);
  const [pageView, setPageView] = useState<"dashboard" | "statistics">(
    "dashboard",
  );

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

  function handleCategoryAdded(addedCategory: CategoryDTO) {
    setBudget((current) => ({
      ...current!,
      categories: [...current!.categories, addedCategory],
    }));
  }

  function handleBudgetUpdated(updatedBudget: BudgetDTO) {
    setBudget(updatedBudget);
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

      const periods = Array.from({ length: 3 }, (_, index) => {
        const historyDate = new Date(today.getFullYear(), today.getMonth() - index, 1);

        return {
          year: historyDate.getFullYear(),
          month: historyDate.getMonth() + 1,
        };
      });

      const history = (
        await Promise.all(
          periods.map(async ({ year: historyYear, month: historyMonth }) => {
            const historyBudget = await BudgetApi.getBudget(historyYear, historyMonth);

            if (!historyBudget) {
              return null;
            }

            const categories = await Promise.all(
              historyBudget.categories.map(async (category) => {
                const categoryTransactions = await CategoryApi.getTransactions(category.id);
                const spent = categoryTransactions.reduce(
                  (sum, transaction) => sum + transaction.amount,
                  0,
                );

                return {
                  id: category.id,
                  name: category.name,
                  spent,
                  limit: category.budget_limit,
                };
              }),
            );

            return {
              id: historyBudget.id,
              label: formatMonthLabel(historyYear, historyMonth),
              total: historyBudget.total_amount,
              spent: categories.reduce((sum, category) => sum + category.spent, 0),
              categories: categories.filter(
                (category) => category.limit > 0 || category.spent > 0,
              ),
            };
          }),
        )
      ).filter((item): item is BudgetHistoryItem => item !== null);

      setBudgetHistory(history);
    }

    loadBudget();
  }, []);

  if (!budget) {
    return <></>;
  }

  const categorySpendMap = Object.fromEntries(
    budget.categories.map((category) => [
      category.id,
      transactions
        .filter((transaction) => transaction.category_id === category.id)
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    ]),
  );
  const total_spent = transactions.reduce((acc, next) => acc + next.amount, 0);
  const allocated_budget = budget.categories.reduce(
    (sum, category) => sum + category.budget_limit,
    0,
  );
  const availableForCategories = Math.max(budget.total_amount - allocated_budget, 0);
  const total_remain = budget.total_amount - total_spent;
  const recentTransactions = [...transactions]
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    );
  const chartData =
    total_spent > 0
      ? budget.categories
          .map((category) => ({
            label: category.name,
            value: categorySpendMap[category.id],
          }))
          .filter((category) => category.value > 0)
      : budget.categories.slice(0, 4).map((category, index) => ({
          label: category.name,
          value: (index + 1) * 10,
        }));

  return (
    <div className="homePage">
      <Modal
        isOpen={createCategoryModalOpen}
        onClose={() => setCreateCategoryModalOpen(false)}
      >
        <AddCategory
          budgetId={budget.id}
          remainingBudget={availableForCategories}
          onSave={(addedCategory) => {
            handleCategoryAdded(addedCategory);
            setCreateCategoryModalOpen(false);
          }}
        />
      </Modal>

      <Modal isOpen={setBudgetModalOpen} onClose={() => setSetBudgetModalOpen(false)}>
        <SetBudgetTotal
          budget={budget}
          onSave={(updatedBudget) => {
            handleBudgetUpdated(updatedBudget);
            setSetBudgetModalOpen(false);
          }}
        />
      </Modal>

      <section className="heroBanner">
        <div>
          <p className="heroBanner__eyebrow">Budgetica</p>
          <h1 className="heroBanner__title">Ваш финансовый месяц в одном аккуратном пространстве</h1>
          <p className="heroBanner__text">
            Следите за расходами по категориям, держите сбережения на виду и замечайте перерасход заранее.
          </p>
        </div>
        <div className="heroBanner__actions">
          <button
            className={`heroBanner__period ${pageView === "dashboard" ? "heroBanner__period--active" : ""}`}
            onClick={() => setPageView("dashboard")}
            type="button"
          >
            {formatMonthLabel(budget.year, budget.month)}
          </button>
          <button
            className={`btn ${pageView === "statistics" ? "btn--primary" : "btn--ghost"}`}
            onClick={() => setPageView("statistics")}
            type="button"
          >
            Показать статистику
          </button>
        </div>
      </section>

      {pageView === "statistics" && budgetHistory.length > 0 && (
        <section className="historyPanel">
          <div className="historyPanel__header">
            <h2>История расходов по категориям</h2>
            <span>Последние 3 месяца</span>
          </div>

          <div className="historyPanel__grid">
            {budgetHistory.map((month) => (
              <article className="historyMonthCard" key={month.id}>
                <div className="historyMonthCard__header">
                  <div>
                    <h3>{month.label}</h3>
                    <p>
                      Потрачено {month.spent} из {month.total}
                    </p>
                  </div>
                </div>

                <div className="historyMonthCard__list">
                  {month.categories.map((category) => (
                    <div className="historyMonthCard__row" key={category.id}>
                      <span>{category.name}</span>
                      <strong>
                        {category.spent} / {category.limit}
                      </strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {pageView === "dashboard" && (
        <>
          <section className="overviewGrid">
            <div className="budgetCard">
              <div className="budgetCard__header">
                <div className="budgetTabs" role="tablist" aria-label="Разделы бюджета">
                  <button
                    aria-selected={budgetTab === "summary"}
                    className={`budgetTab ${budgetTab === "summary" ? "budgetTab--active" : ""}`}
                    onClick={() => setBudgetTab("summary")}
                    role="tab"
                    type="button"
                  >
                    Общий бюджет
                  </button>
                  <button
                    aria-selected={budgetTab === "transactions"}
                    className={`budgetTab ${budgetTab === "transactions" ? "budgetTab--active" : ""}`}
                    onClick={() => setBudgetTab("transactions")}
                    role="tab"
                    type="button"
                  >
                    Последние транзакции
                  </button>
                </div>
              </div>
              {budgetTab === "summary" && (
                <section className="budgetPanel" role="tabpanel">
                  <div className="budgetCard__row">
                    <span>Бюджет на месяц</span>
                    <span>{budget.total_amount}</span>
                  </div>
                  <div className="budgetCard__row">
                    <span>Потрачено</span>
                    <span>{total_spent}</span>
                  </div>
                  <div className="budgetCard__row">
                    <span>Сбережения</span>
                    <span>{saving?.amount ?? 0}</span>
                  </div>
                  <div className="budgetCard__row">
                    <span>Лимиты по категориям</span>
                    <span>{allocated_budget}</span>
                  </div>
                  <div className="budgetCard__row">
                    <span>Транзакций</span>
                    <span>{transactions.length}</span>
                  </div>
                  {total_remain >= 0 && (
                    <div className="budgetCard__row">
                      <span>Остаток</span>
                      <span>{total_remain}</span>
                    </div>
                  )}
                  {total_remain < 0 && (
                    <div className="budgetCard__row">
                      <span>Перерасход</span>
                      <span>{-total_remain}</span>
                    </div>
                  )}
                </section>
              )}

              {budgetTab === "transactions" && (
                <section className="budgetPanel" role="tabpanel">
                  <div className="transactionsInlineHeader">
                    <h2>Последние транзакции</h2>
                    <span>{transactions.length}</span>
                  </div>

                  {recentTransactions.length === 0 && (
                    <div className="transactionsCard__empty">
                      Транзакций пока нет. Добавьте первую операцию из карточки категории.
                    </div>
                  )}

                  {recentTransactions.length > 0 && (
                    <div className="transactionsList transactionsList--scrollable">
                      {recentTransactions.map((transaction) => {
                        const category = budget.categories.find(
                          (item) => item.id === transaction.category_id,
                        );

                        return (
                          <article className="transactionItem" key={transaction.id}>
                            <div>
                              <div className="transactionItem__title">
                                {category?.name ?? "Без категории"}
                              </div>
                              <div className="transactionItem__meta">
                                {new Date(transaction.createdAt).toLocaleDateString(
                                  "ru-RU",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  },
                                )}
                              </div>
                            </div>
                            <strong>{transaction.amount}</strong>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>
              )}
            </div>
            <SpendingPieChart
              action={
                <button
                  className="btn btn--ghost"
                  onClick={() => setSetBudgetModalOpen(true)}
                  type="button"
                >
                  Задать общий бюджет
                </button>
              }
              data={chartData}
              totalBudget={budget.total_amount}
              totalSpent={total_spent}
            />
          </section>

          <div className="sectionHeader">
            <h2>Категории расходов</h2>
            <button
              className="btn btn--primary"
              disabled={availableForCategories <= 0}
              onClick={() => setCreateCategoryModalOpen(true)}
              type="button"
            >
              Новая категория
            </button>
          </div>
          <div className="categoryGrid">
            {budget.categories.map((category) => (
              <CategoryWidget
                key={category.id}
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
      )}
    </div>
  );
}
