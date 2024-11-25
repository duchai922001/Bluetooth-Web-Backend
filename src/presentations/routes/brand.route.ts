import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { BrandDTO } from "../dtos/brand/brand.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  createBrandController,
  deleteSoftBrandController,
  restoreBrandController,
} from "../controllers/brand.controller";

const brandRoutes = Router();

brandRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(BrandDTO),
  catchAsync(createBrandController)
);

brandRoutes.put(
  "/delete-soft",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(deleteSoftBrandController)
);

brandRoutes.put(
  "/restore",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(restoreBrandController)
);
export default brandRoutes;
