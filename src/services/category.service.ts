import { ICategory } from "../infrastructure/model/category.model";
import { CreateCategoryDto } from "../presentations/dtos/category/create-category.dto";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { UpdateCategoryDto } from "../presentations/dtos/category/update-category.dto";
import { UpdateIsDeleteCategoryDto } from "../presentations/dtos/category/update-isDelete-category.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
const categoryRepositry = new CategoryRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
export const createCategoryService = async (
  category: Partial<ICategory>
): Promise<ICategory> => {
  const createCategoryDto = await createAndValidateDto(
    CreateCategoryDto,
    category
  );
  return await categoryRepositry.createCategory(createCategoryDto);
};

export const updateCategoryService = async (
  categoryId: string,
  formUpdate: Partial<ICategory>
): Promise<ICategory | null> => {
  const updateCategoryDto = await createAndValidateDto(UpdateCategoryDto, {
    ...formUpdate,
    categoryId,
  });
  return await categoryRepositry.updateCategory(
    updateCategoryDto.categoryId,
    updateCategoryDto
  );
};

export const deleteCategoryService = async (
  categoryId: string
): Promise<void> => {
  const deleteCategoryDto = await createAndValidateDto(
    UpdateIsDeleteCategoryDto,
    { categoryId }
  );
  await categoryRepositry.updateIsDeleted(deleteCategoryDto.categoryId, true);
  const products = await productRepository.findProductByCategory(categoryId);
  if (products.length > 0) {
    await Promise.all(
      products.map(async (product) => {
        await productRepository.updateProduct(product._id as string, {
          isDeleted: true,
        });
      })
    );
  }
};

export const restoreCategoryService = async (
  categoryId: string
): Promise<ICategory | null> => {
  const deleteCategoryDto = await createAndValidateDto(
    UpdateIsDeleteCategoryDto,
    { categoryId }
  );

  return await categoryRepositry.updateIsDeleted(
    deleteCategoryDto.categoryId,
    false
  );
};

export const getAllCategoryService = async (): Promise<ICategory[]> => {
  return await categoryRepositry.getAllCategories();
};

export const getCategoriesActive = async (): Promise<ICategory[]> => {
  return await categoryRepositry.getCategoriesActive();
};
