import { IBrand } from "../../infrastructure/model/brand.model";

export interface IBrandRepository {
  createBrand(brand: IBrand): Promise<IBrand>;
}
