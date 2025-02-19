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
  getFilteredProductsController,
  getProductByIdController,
  getProductsActiveController,
  getProductsController,
  getProductSpecial,
  updateProductController,
} from "../controllers/product.controller";
import { CreateProductDTO } from "../dtos/product/create-product.dto";
import { UpdateProductDTO } from "../dtos/product/update-product.dto";
import { FilterProductDto } from "../dtos/product/filter-product.dto";

const productRoutes = Router();

productRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(CreateProductDTO),
  catchAsync(createProductController)
);

productRoutes.get("/get-all", catchAsync(getProductsController));
productRoutes.get("/get-active", catchAsync(getProductsActiveController));
productRoutes.put(
  "/update/:productId",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(UpdateProductDTO),
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

productRoutes.post(
  "/get-filter",
  transformAndValidate(FilterProductDto),
  catchAsync(getFilteredProductsController)
);

productRoutes.get("/get-product-id/:productId", catchAsync(getProductByIdController));

productRoutes.get("/get-product-special", catchAsync(getProductSpecial));
export default productRoutes;
