import { IBrandRepository } from "../../domain/repositories/brand.repository";
import Brand, { IBrand } from "../model/brand.model";

export class BrandRepositoryImpl implements IBrandRepository {
  async createBrand(brand: IBrand): Promise<IBrand> {
    return await Brand.create(brand);
  }
}
