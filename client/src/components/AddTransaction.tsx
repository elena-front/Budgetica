import { type SubmitEvent, type ChangeEvent, useState } from "react";
import type {
  CategoryDTO,
  TransactionDTO,
} from "../../../server/src/types/database.types";
import TransactionApi from "../entities/TransactionApi";

export default function AddTransaction({
  category,
  onSave,
}: {
  category: CategoryDTO;
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount"></label>
        <input
          id="amount"
          name="amount"
          onChange={inputHandler}
          value={formData.amount}
        />
      </div>
      <button type="submit" disabled={!canAdd}>
        Добавить
      </button>
    </form>
  );
}
