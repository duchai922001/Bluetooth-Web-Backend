import { Request, Response } from "express";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { SpecificationService } from "../../services/specification.service";

export const SpecificationController = {
  createSpecification: async (req: Request, res: Response) => {
    const newSpecificationOfProduct =
      await SpecificationService.createSpecification(req.body);
    res.json(
      successResponse(
        HttpStatus.CREATED,
        "Specification of product created successfully",
        newSpecificationOfProduct
      )
    );
  },
  getSpecificationByCategoryId: async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const data = await SpecificationService.getSpecificationByCategoryId(
      categoryId
    );
    return res.json(successResponse(HttpStatus.OK, "Get data success", data));
  },
};
