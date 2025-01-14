import { IProduct } from "../../infrastructure/model/product.model";

export interface IProductRepository {
  createProduct(product: IProduct): Promise<IProduct>;
  getProducts(): Promise<IProduct[]>;
  updateProduct(
    productId: string,
    formData: IProduct
  ): Promise<IProduct | null>;
  deleteProduct(productId: string): Promise<boolean>;
  findProductById(productId: string): Promise<IProduct | null>;
  findProductByBrand(brandId: string): Promise<IProduct[]>;
  findProductByCategory(categoryId: string): Promise<IProduct[]>;
}
