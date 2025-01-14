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
  getCategoriesActiveController,
  restoreCategoryController,
  updateCategoryController,
} from "../controllers/category.controller";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { UpdateIsDeleteCategoryDto } from "../dtos/category/update-isDelete-category.dto";
const categoryRoutes = Router();

categoryRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(CreateCategoryDto),
  catchAsync(createCategoryController)
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
export default categoryRoutes;

categoryRoutes.get("/get-active", catchAsync(getCategoriesActiveController));
