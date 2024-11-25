import { Router } from "express";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { SpecificationDTO } from "../dtos/specification/specification.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import { createSpecificationController } from "../controllers/specification.controller";
import { verifyToken } from "../../middlewares/verifyToken.middleware";

const specificaionRoutes = Router();

specificaionRoutes.post(
  "/create",
  verifyToken,
  authorizeRoles(RoleEnum.ADMIN, RoleEnum.STAFF),
  transformAndValidate(SpecificationDTO),
  catchAsync(createSpecificationController)
);

export default specificaionRoutes;
