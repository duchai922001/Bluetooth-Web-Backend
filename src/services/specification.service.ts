import mongoose from "mongoose";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { IProductSpecification } from "../infrastructure/model/productSpecification.model";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
import { SpecificationDTO } from "../presentations/dtos/specification/specification.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const specificationRepository = new SpecificationRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
export const createSpecification = async (
  specification: IProductSpecification
) => {
  const createSpecificationDTO = await createAndValidateDto(
    SpecificationDTO,
    specification
  );
  const specificationAdd = await specificationRepository.createSpecification(
    createSpecificationDTO
  );
  if (!specificationAdd) {
    throw new BadRequestException("Error while creating specification");
  }
  const product = await productRepository.findProductById(
    specificationAdd.productId
  );
  if (!product) {
    throw new NotFoundException("Product not found");
  }
  // product.specifications.push(
  //   new mongoose.Types.ObjectId(specificationAdd._id as string)
  // );
  await product.save();
  return specificationAdd;
};
