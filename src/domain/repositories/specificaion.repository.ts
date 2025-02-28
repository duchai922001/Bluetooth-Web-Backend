import { IProductSpecification } from "../../infrastructure/model/productSpecification.model";

export interface ISpecificationRepository {
  createSpecification(
    specification: IProductSpecification
  ): Promise<IProductSpecification>;
  getSpecificationByCategoryId(
    categoryId: string
  ): Promise<IProductSpecification[]>;
}
