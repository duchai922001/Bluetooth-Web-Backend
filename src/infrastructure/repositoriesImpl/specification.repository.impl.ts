import { ISpecificationRepository } from "../../domain/repositories/specificaion.repository";
import {
  IProductSpecification,
  ProductSpecification,
} from "../model/productSpecification.model";

export class SpecificationRepositoryImpl implements ISpecificationRepository {
  async updateSpecification(
    id: string,
    data: any
  ): Promise<IProductSpecification | null> {
    return await ProductSpecification.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
  async getSpecificationByCategoryId(
    categoryId: string
  ): Promise<IProductSpecification[]> {
    return await ProductSpecification.find({ categoryId });
  }
  async createSpecifications(
    specifications: IProductSpecification[]
  ): Promise<IProductSpecification[]> {
    return await ProductSpecification.insertMany(specifications);
  }
}
