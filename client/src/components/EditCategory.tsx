import type { CategoryDTO } from "../types/database.types";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import CategoryApi from "../entities/CategoryApi";

export default function EditCategory({
  category,
  onSave,
}: {
  category: CategoryDTO;
  // eslint-disable-next-line no-unused-vars
  onSave: (updatedCategory: CategoryDTO) => void;
}) {
  const [formData, setFormData] = useState({
    name: category.name,
    budget_limit: category.budget_limit,
  });

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const updatedCategory = await CategoryApi.updateCategory(
      category.id,
      formData,
    );
    onSave(updatedCategory);
  }

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className="modalForm" onSubmit={handleSubmit}>
      <div className="modalForm__header">
        <h3>Редактирование категории</h3>
        <p>Измените название и лимит расходов для выбранной категории.</p>
      </div>

      <div className="modalField">
        <label htmlFor="name">Название</label>
        <input
          id="name"
          name="name"
          onChange={inputHandler}
          placeholder="Например, Продукты"
          value={formData.name}
        ></input>
      </div>
      <div className="modalField">
        <label htmlFor="budget_limit">Лимит</label>
        <input
          id="budget_limit"
          name="budget_limit"
          type="number"
          min="0"
          step="0.01"
          onChange={inputHandler}
          placeholder="Например, 10000"
          value={formData.budget_limit}
        ></input>
      </div>

      <div className="modalActions">
        <button className="modalButton modalButton--primary" type="submit">
          Сохранить
        </button>
      </div>
    </form>
  );
}
