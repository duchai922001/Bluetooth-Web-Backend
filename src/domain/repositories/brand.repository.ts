import { IBrand } from "../../infrastructure/model/brand.model";

export interface IBrandRepository {
  createBrand(brand: IBrand): Promise<IBrand>;
  updateIsDeleted(brandId: string, isDeleted: boolean): Promise<IBrand | null>;
  updateBrand(
    brandId: string,
    formUpdate: Partial<IBrand>
  ): Promise<IBrand | null>;
  getAllBrands(): Promise<IBrand[]>;
  getBrandsActive(): Promise<IBrand[]>;
}
