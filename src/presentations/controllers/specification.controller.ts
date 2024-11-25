import { Request, Response } from "express";
import { createSpecification } from "../../services/specification.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createSpecificationController = async (
  req: Request,
  res: Response
) => {
  const newSpecificationOfProduct = await createSpecification(req.body);
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Specification of product created successfully",
      newSpecificationOfProduct
    )
  );
};
