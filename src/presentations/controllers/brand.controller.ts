import { Request, Response } from "express";
import { createBrandService } from "../../services/brand.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createBrandController = async (req: Request, res: Response) => {
  const newBrand = await createBrandService(req.body);
  res.json(
    successResponse(HttpStatus.CREATED, "Brand created successfully", newBrand)
  );
};
