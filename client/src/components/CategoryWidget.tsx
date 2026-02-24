import { useState } from "react";
import type {
  CategoryDTO,
  TransactionDTO,
} from "../../../server/src/types/database.types";
import { Modal } from "./Modal";
import EditCategory from "./EditCategory";
import AddTransaction from "./AddTransaction";

export default function CategoryWidget({
  category,
  transactions,
  onCategoryUpdated,
  onTransactionAdded,
}: {
  category: CategoryDTO;
  transactions: TransactionDTO[];
  onCategoryUpdated: (updatedCategory: CategoryDTO) => void;
  onTransactionAdded: (transaction: TransactionDTO) => void;
}) {
  const [editModal, setEditModal] = useState(false);
  const [addTransactionModal, setAddTransactionModal] = useState(false);

  const total_spent = transactions.reduce((acc, next) => acc + next.amount, 0);
  const total_remain = category.budget_limit - total_spent;
  return (
    <>
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <EditCategory
          category={category}
          onSave={(updatedCategory) => {
            setEditModal(false);
            onCategoryUpdated(updatedCategory);
          }}
        />
      </Modal>

      <Modal
        isOpen={addTransactionModal}
        onClose={() => setAddTransactionModal(false)}
      >
        <AddTransaction
          category={category}
          onSave={(addedTransaction) => {
            setAddTransactionModal(false);
            onTransactionAdded(addedTransaction);
          }}
        />
      </Modal>

      <div>диаграмма</div>
      <div>{category.name}</div>
      <div>Лимит: {category.budget_limit}</div>
      <div>Потрачено: {total_spent}</div>
      {total_remain >= 0 && <div>Остаток: {total_remain}</div>}
      {total_remain < 0 && <div>Перерасход: {-total_remain}</div>}
      <button onClick={() => setEditModal(true)}>Редактировать</button>
      <button onClick={() => setAddTransactionModal(true)}>
        Добавить транзакцию
      </button>
    </>
  );
}
