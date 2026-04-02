import type { CategoryDTO } from "../../../server/src/types/database.types";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import CategoryApi from "../entities/CategoryApi";

export default function EditCategory({
  category,
  onSave,
}: {
  category: CategoryDTO;
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          name="name"
          onChange={inputHandler}
          value={formData.name}
        ></input>
      </div>
      <div>
        <label htmlFor="budget_limit">Лимит</label>
        <input
          id="budget_limit"
          name="budget_limit"
          onChange={inputHandler}
          value={formData.budget_limit}
        ></input>
      </div>
      <button type="submit">Сохранить</button>
    </form>
  );
}
