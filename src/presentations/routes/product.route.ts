import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { ProductDTO } from "../dtos/product/product.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import {
  createProductController,
  deleteProductController,
  deleteSoftProductController,
  getProductsController,
  updateProductController,
} from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(ProductDTO),
  catchAsync(createProductController)
);

productRoutes.get("/get-all", catchAsync(getProductsController));
productRoutes.put(
  "/update",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(ProductDTO),
  catchAsync(updateProductController)
);

productRoutes.put(
  "/delete-soft",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(deleteSoftProductController)
);

productRoutes.delete(
  "/delete",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  catchAsync(deleteProductController)
);
export default productRoutes;
