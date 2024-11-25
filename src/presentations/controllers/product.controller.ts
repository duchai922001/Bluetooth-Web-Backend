import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  deleteSoftProductService,
  getProductsService,
  updateProductService,
} from "../../services/product.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createProductController = async (req: Request, res: Response) => {
  const newProduct = await createProductService(req.body);
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Create Product Successfully",
      newProduct
    )
  );
};

export const getProductsController = async (req: Request, res: Response) => {
  const products = await getProductsService();
  res.json(
    successResponse(HttpStatus.OK, "Get Products Successfully", products)
  );
};

export const updateProductController = async (req: Request, res: Response) => {
  const product = await updateProductService(req.body);
  res.json(
    successResponse(HttpStatus.OK, "Update Product Successfully", product)
  );
};

export const deleteSoftProductController = async (
  req: Request,
  res: Response
) => {
  const ids = req.query.ids as string;
  await deleteSoftProductService(ids);
  res.json(successResponse(HttpStatus.OK, "Delete Soft Product Successfully"));
};

export const deleteProductController = async (req: Request, res: Response) => {
  const ids = req.query.ids as string;
  await deleteProductService(ids);
  res.json(successResponse(HttpStatus.OK, "Delete Product Successfully"));
};
