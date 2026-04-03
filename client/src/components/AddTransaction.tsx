import { type SubmitEvent, type ChangeEvent, useState } from "react";
import type { CategoryDTO, TransactionDTO } from "../types/database.types";
import TransactionApi from "../entities/TransactionApi";

export default function AddTransaction({
  category,
  onSave,
}: {
  category: CategoryDTO;
  // eslint-disable-next-line no-unused-vars
  onSave: (transaction: TransactionDTO) => void;
}) {
  const [formData, setFormData] = useState({ amount: 0 });

  const canAdd = formData.amount > 0;

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const transaction = await TransactionApi.createTransaction(
      category.id,
      formData.amount,
    );
    onSave(transaction);
  }

  return (
    <form className="modalForm" onSubmit={handleSubmit}>
      <div className="modalForm__header">
        <h3>Добавить транзакцию</h3>
        <p>Укажите сумму расхода для категории «{category.name}».</p>
      </div>

      <div className="modalField">
        <label htmlFor="amount">Сумма</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          onChange={inputHandler}
          placeholder="Например, 1500"
          value={formData.amount}
        />
      </div>

      <div className="modalActions">
        <button className="modalButton modalButton--primary" type="submit" disabled={!canAdd}>
          Добавить
        </button>
      </div>
    </form>
  );
}
