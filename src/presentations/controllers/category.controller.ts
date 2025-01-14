import { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoryService,
  getCategoriesActive,
  restoreCategoryService,
  updateCategoryService,
} from "../../services/category.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newCategory = await createCategoryService(req.body);
  res.json(
    successResponse(HttpStatus.CREATED, "Create Category Success", newCategory)
  );
};

export const updateCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updateCategory = await updateCategoryService(
    req.body.categoryId,
    req.body
  );
  res.json(
    successResponse(HttpStatus.OK, "Update Category Success", updateCategory)
  );
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  const deleteCategory = await deleteCategoryService(req.body.categoryId);
  res.json(
    successResponse(HttpStatus.OK, "Delete Category Success", deleteCategory)
  );
};

export const restoreCategoryController = async (
  req: Request,
  res: Response
) => {
  const restoreCategory = await restoreCategoryService(req.body.categoryId);
  res.json(
    successResponse(HttpStatus.OK, "Restore Category Success", restoreCategory)
  );
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const categories = await getAllCategoryService();
  res.json(
    successResponse(HttpStatus.OK, "Get All Categories Success", categories)
  );
};

export const getCategoriesActiveController = async (
  req: Request,
  res: Response
) => {
  const categories = await getCategoriesActive();
  res.json(successResponse(HttpStatus.OK, "Get Categories Active", categories));
};
