import { ICategory } from "../../infrastructure/model/category.model";

export interface ICategoryRepository {
  createCategory(category: Partial<ICategory>): Promise<ICategory>;
  updateCategory(
    categoryId: string,
    formUpdate: Partial<ICategory>
  ): Promise<ICategory | null>;
  updateIsDeleted(
    categoryId: string,
    status: boolean
  ): Promise<ICategory | null>;
  getAllCategories(): Promise<ICategory[]>;
  deleteCategory(categoryId: string): Promise<void>;
  getCategoriesActive(): Promise<ICategory[]>;
}
