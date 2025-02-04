import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { IProduct } from "../infrastructure/model/product.model";
import { IProductSpecification } from "../infrastructure/model/productSpecification.model";
import { IProductVariant } from "../infrastructure/model/productVariant.model";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";
import { CreateProductDTO } from "../presentations/dtos/product/create-product.dto";
import { ProductDTO } from "../presentations/dtos/product/product.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const productRepository = new ProductRepositoryImpl();
const specificationRepository = new SpecificationRepositoryImpl();
const variantRepository = new VariantRepositoryImpl();
async function getSpecifications(
  productId: string
): Promise<IProductSpecification[]> {
  const specifications =
    await specificationRepository.getSpecificationByProductId(productId);
  const plainSpecification = specifications.map((spec: any) => {
    const specObject = spec.toObject();
    delete specObject._id;
    delete specObject.productId;
    delete specObject.updatedAt, delete specObject.createdAt;
    return specObject;
  });
  return plainSpecification;
}

async function getVariants(productId: string): Promise<IProductVariant[]> {
  const variants = await variantRepository.getVariantByProductId(productId);
  const plainVariants = variants.map((variant) => {
    const variantObject = variant.toObject();
    delete variantObject._id;
    delete variantObject.productId;
    delete variantObject.updatedAt;
    delete variantObject.createdAt;
    return variantObject;
  });
  return plainVariants;
}

export const createProductService = async (product: Partial<IProduct>) => {
  const createProductDto = await createAndValidateDto(
    CreateProductDTO,
    product
  );
  return await productRepository.createProduct(createProductDto);
};

export const getProductsService = async () => {
  const products = await productRepository.getProducts();

  return products;
};

export const updateProductService = async (formData: Partial<IProduct>) => {
  const updateProductDTO = await createAndValidateDto(ProductDTO, formData);
  const productId = updateProductDTO.productId;
  if (!productId) {
    throw new BadRequestException("Product Id is required");
  }
  const product = await productRepository.updateProduct(
    productId,
    updateProductDTO
  );
  return product;
};

export const deleteSoftProductService = async (ids: string) => {
  const idArray = ids.split(",").map((id) => id.trim());
  await Promise.all(
    idArray.map(async (id) => {
      await productRepository.updateProduct(id, { isDeleted: true });
    })
  );
};

export const deleteProductService = async (ids: string) => {
  const idArray = ids.split(",").map((id) => id.trim());
  await Promise.all(
    idArray.map(async (id) => {
      await productRepository.deleteProduct(id);
    })
  );
};
