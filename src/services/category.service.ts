import { ICategory } from "../infrastructure/model/category.model";
import { CreateCategoryDto } from "../presentations/dtos/category/create-category.dto";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { UpdateCategoryDto } from "../presentations/dtos/category/update-category.dto";
import { UpdateIsDeleteCategoryDto } from "../presentations/dtos/category/update-isDelete-category.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const categoryRepositry = new CategoryRepositoryImpl();
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
): Promise<ICategory | null> => {
  const deleteCategoryDto = await createAndValidateDto(
    UpdateIsDeleteCategoryDto,
    { categoryId }
  );

  return await categoryRepositry.updateIsDeleted(
    deleteCategoryDto.categoryId,
    true
  );
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
