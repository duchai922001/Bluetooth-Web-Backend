import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../domain/enums/http-status.enum";

export const transformAndValidate =
  (DtoClass: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dtoInstance = plainToInstance(DtoClass, req.body);
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Validation failed",
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
        return;
      }

      req.body = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
