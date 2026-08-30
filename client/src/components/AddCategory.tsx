import { useState, type ChangeEvent, type SubmitEvent } from "react";
import CategoryApi from "../entities/CategoryApi";
import type { CategoryDTO } from "../types/database.types";

export default function AddCategory({
  budgetId,
  remainingBudget,
  onSave,
}: {
  budgetId: number;
  remainingBudget: number;
  // eslint-disable-next-line no-unused-vars
  onSave: (category: CategoryDTO) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    budget_limit: 0,
  });

  const canSave =
    formData.name.trim().length > 0 &&
    Number(formData.budget_limit) >= 0 &&
    Number(formData.budget_limit) <= remainingBudget;

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const newCategory = await CategoryApi.createCategory({
      budget_id: budgetId,
      name: formData.name.trim(),
      budget_limit: Number(formData.budget_limit),
    });

    onSave(newCategory);
  }

  return (
    <form className="modalForm" onSubmit={handleSubmit}>
      <div className="modalForm__header">
        <h3>Новая категория</h3>
        <p>
          Добавьте ещё одну категорию расходов в текущий бюджет.
          Доступно для распределения: {remainingBudget}
        </p>
      </div>

      <div className="modalField">
        <label htmlFor="category_name">Название</label>
        <input
          id="category_name"
          name="name"
          onChange={inputHandler}
          placeholder="Например, Развлечения"
          value={formData.name}
        />
      </div>

      <div className="modalField">
        <label htmlFor="category_limit">Лимит</label>
        <input
          id="category_limit"
          name="budget_limit"
          type="number"
          min="0"
          step="0.01"
          onChange={inputHandler}
          placeholder="Например, 5000"
          value={formData.budget_limit}
        />
      </div>

      <div className="modalActions">
        <button className="modalButton modalButton--primary" disabled={!canSave} type="submit">
          Создать категорию
        </button>
      </div>
    </form>
  );
}
