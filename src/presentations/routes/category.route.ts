import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  restoreCategoryController,
  updateCategoryController,
} from "../controllers/category.controller";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { UpdateIsDeleteCategoryDto } from "../dtos/category/update-isDelete-category.dto";
const categoryRoutes = Router();

categoryRoutes.post(
  "/category",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(CreateCategoryDto),
  catchAsync(createCategoryController)
);

categoryRoutes.put(
  "/category",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateCategoryDto),
  catchAsync(updateCategoryController)
);

categoryRoutes.put(
  "/delete-category",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateIsDeleteCategoryDto),
  catchAsync(deleteCategoryController)
);

categoryRoutes.put(
  "/restore-category",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateIsDeleteCategoryDto),
  catchAsync(restoreCategoryController)
);

categoryRoutes.get("/categories", catchAsync(getAllCategoriesController));
export default categoryRoutes;