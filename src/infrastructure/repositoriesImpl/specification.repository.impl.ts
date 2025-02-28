import { ISpecificationRepository } from "../../domain/repositories/specificaion.repository";
import {
  IProductSpecification,
  ProductSpecification,
} from "../model/productSpecification.model";

export class SpecificationRepositoryImpl implements ISpecificationRepository {
  async getSpecificationByProductId(
    productId: string
  ): Promise<IProductSpecification[]> {
    return await ProductSpecification.find({ categoryId: productId });
  }
  async createSpecification(
    specification: IProductSpecification
  ): Promise<IProductSpecification> {
    return await ProductSpecification.create(specification);
  }
}
