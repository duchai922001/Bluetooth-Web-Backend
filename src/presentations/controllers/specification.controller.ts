import { Request, Response } from "express";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { SpecificationService } from "../../services/specification.service";

export const SpecificationController = {
  createSpecification: async (req: Request, res: Response) => {
    const { categoryId, type } = req.body;
    const newSpecificationOfProduct =
      await SpecificationService.createSpecification(categoryId, type);
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
    const mapFormatData = {
      categoryId: data[0]?.categoryId,
      type: data.map((item) => ({
        groupName: item.groupName,
        specifications: item.specifications.map((spec) => ({
          name: spec.name,
          id: spec._id,
        })),
      })),
    };
    return res.json(
      successResponse(HttpStatus.OK, "Get data success", mapFormatData)
    );
  },

  getSpecificationByCategoryUrl: async (req: Request, res: Response) => {
    const { categoryUrl } = req.params;
    const data = await SpecificationService.getSpecificationFilterByCategoryUrl(
      categoryUrl
    );

    return res.json(successResponse(HttpStatus.OK, "Get data success", data));
  },

  updateSpecification: async (req: Request, res: Response) => {
    const { id } = req.params;
    const dataUpdate = await SpecificationService.updateSpecification(
      id,
      req.body
    );
    return res.json(
      successResponse(HttpStatus.OK, "Update data success", dataUpdate)
    );
  },
};
