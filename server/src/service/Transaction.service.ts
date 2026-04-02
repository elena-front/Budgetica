import { Transaction } from "../db/models";
import type { CreateTransactionDTO } from "../types/database.types";

export default class TransactionService {
  static async getAllTransactions(category_id: number) {
    return (await Transaction.findAll({ where: { category_id } })).map(
      (transaction) => transaction.get(),
    );
  }

  static async createNewTransaction(categoryData: CreateTransactionDTO) {
    return (await Transaction.create(categoryData)).get();
  }

  static async updateTransactionById(id: number, amount: number) {
    const transactionToUpdate = await Transaction.findByPk(id);

    if (!transactionToUpdate) return null;

    transactionToUpdate.amount = amount;

    await transactionToUpdate.save();

    return transactionToUpdate;
  }

  static async deleteTransaction(id: number) {
    const transactionToDelete = await Transaction.findByPk(id);

    if (!transactionToDelete) return null;
    return await transactionToDelete.destroy();
  }
}
