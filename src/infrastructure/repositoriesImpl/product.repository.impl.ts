import { IProductRepository } from "../../domain/repositories/product.repository";
import Product, { IProduct } from "../model/product.model";

export class ProductRepositoryImpl implements IProductRepository {
  async findProductByBrand(brandId: string): Promise<IProduct[]> {
    return await Product.find({ brandId });
  }
  async findProductById(productId: string): Promise<IProduct | null> {
    return await Product.findById(productId);
  }
  async deleteProduct(productId: string): Promise<boolean> {
    const product = await Product.findByIdAndDelete(productId);
    return !!product;
  }
  async updateProduct(
    productId: string,
    formData: any
  ): Promise<IProduct | null> {
    const product = await Product.findByIdAndUpdate(productId, formData, {
      new: true,
    });
    return product;
  }
  async getProducts(): Promise<IProduct[]> {
    return await Product.find();
  }
  async createProduct(product: IProduct): Promise<IProduct> {
    return await Product.create(product);
  }
}
