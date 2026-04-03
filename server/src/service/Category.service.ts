import { Category } from "../db/models";
import type { CreateCategoryDTO } from "../types/database.types";

export default class CategoryService {
  static async getAllCategory(budget_id: number) {
    return (await Category.findAll({ where: { budget_id } }));
  }

  static async getCategoryById(id:number){
    return await Category.findByPk(id);
  }

  static async createNewCategory(categoryData: CreateCategoryDTO) {
    return (await Category.create(categoryData));
  }

  static async updateCategoryById(id: number, categoryData: { name: string; budget_limit: number; }) {
    const categoryToUpdate = await Category.findByPk(id);

    const {name, budget_limit} = categoryData;

    if (!categoryToUpdate) return null;

    if(name !== undefined) {
        categoryToUpdate.name = name;
    }
    if(budget_limit !== undefined) {
        categoryToUpdate.budget_limit = budget_limit;
    }

    await categoryToUpdate.save();

    return categoryToUpdate;
  }

  static async deleteCategory(id: number) {
    const categoryToDelete = await Category.findByPk(id);
     
    if(!categoryToDelete) return null;
return await categoryToDelete.destroy();
  }
}
