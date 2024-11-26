import { Request, Response } from "express";
import {
  createBrandService,
  deleteSoftBrandService,
  restoreBrandService,
} from "../../services/brand.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createBrandController = async (req: Request, res: Response) => {
  const newBrand = await createBrandService(req.body);
  res.json(
    successResponse(HttpStatus.CREATED, "Brand created successfully", newBrand)
  );
};

export const deleteSoftBrandController = async (
  req: Request,
  res: Response
) => {
  const brandIds = req.query.ids as string;
  await deleteSoftBrandService(brandIds);
  res.json(successResponse(HttpStatus.OK, "Delete brand soft successfully"));
};

export const restoreBrandController = async (req: Request, res: Response) => {
  const brandIds = req.query.ids as string;
  await restoreBrandService(brandIds);
  res.json(successResponse(HttpStatus.OK, "Restore brand successfully"));
};
