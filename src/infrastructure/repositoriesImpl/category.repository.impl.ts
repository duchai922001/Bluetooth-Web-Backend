import { ICategoryRepository } from "../../domain/repositories/category.repository";
import Category, { ICategory } from "../model/category.model";

export class CategoryRepositoryImpl implements ICategoryRepository {
  async findCategoryById(categoryId: string): Promise<ICategory | null> {
    //code
    return await Category.findById(categoryId);
  }
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
  async getCategoriesActive(): Promise<ICategory[]> {
    return await Category.find({ isDeleted: false });
  }
  async getCategoriesInActive(): Promise<ICategory[]> {
    return await Category.find({ isDeleted: true });
  }
  async getCategoryById(categoryId: string): Promise<ICategory | null> {
    return await Category.findById(categoryId);
  }
  deleteCategory(categoryId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
