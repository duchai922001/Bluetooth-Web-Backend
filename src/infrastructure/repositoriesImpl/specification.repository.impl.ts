import { ISpecificationRepository } from "../../domain/repositories/specificaion.repository";
import {
  IProductSpecification,
  ProductSpecification,
} from "../model/productSpecification.model";

export class SpecificationRepositoryImpl implements ISpecificationRepository {
  async getSpecificationByCategoryId(
    categoryId: string
  ): Promise<IProductSpecification[]> {
    return await ProductSpecification.find({ categoryId });
  }
  async createSpecification(
    specification: IProductSpecification
  ): Promise<IProductSpecification> {
    return await ProductSpecification.create(specification);
  }
}
