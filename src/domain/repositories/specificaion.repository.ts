import { IProductSpecification } from "../../infrastructure/model/productSpecification.model";

export interface ISpecificationRepository {
  createSpecification(
    specification: IProductSpecification
  ): Promise<IProductSpecification>;
  getSpecificationByProductId(
    productId: string
  ): Promise<IProductSpecification[]>;
}
