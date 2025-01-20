import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  addCategoryTreeController,
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoriesActiveController,
  getCategoriesFormatMenuController,
  getCategoriesInActiveController,
  getCategoryByIdController,
  restoreCategoryController,
  updateCategoryController,
} from "../controllers/category.controller";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { UpdateIsDeleteCategoryDto } from "../dtos/category/update-isDelete-category.dto";
import { AddCategoryTreeDTO } from "../dtos/category/add-category-tree.dto";
const categoryRoutes = Router();

categoryRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(CreateCategoryDto),
  catchAsync(createCategoryController)
);

categoryRoutes.post(
  "/add-sub/:categoryId",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(AddCategoryTreeDTO),
  catchAsync(addCategoryTreeController)
);

categoryRoutes.put(
  "/update",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateCategoryDto),
  catchAsync(updateCategoryController)
);

categoryRoutes.put(
  "/delete-soft",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateIsDeleteCategoryDto),
  catchAsync(deleteCategoryController)
);

categoryRoutes.put(
  "/restore",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateIsDeleteCategoryDto),
  catchAsync(restoreCategoryController)
);
categoryRoutes.get("/get-all", catchAsync(getAllCategoriesController));
categoryRoutes.get("/get-active", catchAsync(getCategoriesActiveController));
categoryRoutes.get(
  "/get-in-active",
  catchAsync(getCategoriesInActiveController)
);
categoryRoutes.get(
  "/get-format-menu",
  catchAsync(getCategoriesFormatMenuController)
);
categoryRoutes.get(
  "/get-category/:categoryId",
  catchAsync(getCategoryByIdController)
);
export default categoryRoutes;
