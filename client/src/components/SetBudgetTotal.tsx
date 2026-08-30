import { useState, type ChangeEvent, type SubmitEvent } from "react";
import BudgetApi from "../entities/BudgetApi";
import type { BudgetDTO } from "../types/database.types";

export default function SetBudgetTotal({
  budget,
  onSave,
}: {
  budget: BudgetDTO;
  // eslint-disable-next-line no-unused-vars
  onSave: (budget: BudgetDTO) => void;
}) {
  const [totalAmount, setTotalAmount] = useState(budget.total_amount);

  const canSave = Number(totalAmount) >= 0;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const updatedBudget = await BudgetApi.updateBudget(
      budget.year,
      budget.month,
      Number(totalAmount),
    );

    onSave(updatedBudget);
  }

  return (
    <form className="modalForm" onSubmit={handleSubmit}>
      <div className="modalForm__header">
        <h3>Общий бюджет</h3>
        <p>Укажите сумму, которую хотите распределить между категориями.</p>
      </div>

      <div className="modalField">
        <label htmlFor="total_amount">Сумма бюджета</label>
        <input
          id="total_amount"
          min="0"
          name="total_amount"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTotalAmount(Number(event.target.value))
          }
          placeholder="Например, 50000"
          step="0.01"
          type="number"
          value={totalAmount}
        />
      </div>

      <div className="modalActions">
        <button
          className="modalButton modalButton--primary"
          disabled={!canSave}
          type="submit"
        >
          Сохранить бюджет
        </button>
      </div>
    </form>
  );
}
