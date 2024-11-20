import { ICategoryRepository } from "../../domain/repositories/category.repository";
import Category, { ICategory } from "../model/category.model";

export class CategoryRepositoryImpl implements ICategoryRepository {
  async updateIsDeleted(
    categoryId: string,
    status: boolean
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(
      categoryId,
      { isDeleted: status },
      {
        new: true,
      }
    );
  }

  async updateCategory(
    categoryId: string,
    formUpdate: Partial<ICategory>
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(categoryId, formUpdate, {
      new: true,
    });
  }
  async createCategory(category: Partial<ICategory>): Promise<ICategory> {
    return await Category.create(category);
  }
  async getAllCategories(): Promise<ICategory[]> {
    return await Category.find();
  }
  deleteCategory(categoryId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
