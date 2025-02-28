import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { IProduct } from "../infrastructure/model/product.model";
import { IProductSpecification } from "../infrastructure/model/productSpecification.model";
import { IProductVariant } from "../infrastructure/model/productVariant.model";
import { BrandRepositoryImpl } from "../infrastructure/repositoriesImpl/brand.repository.impl";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";
import { CreateProductDTO } from "../presentations/dtos/product/create-product.dto";
import { FilterProductDto } from "../presentations/dtos/product/filter-product.dto";
import { ProductDTO } from "../presentations/dtos/product/product.dto";
import { UpdateProductDTO } from "../presentations/dtos/product/update-product.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const productRepository = new ProductRepositoryImpl();
const specificationRepository = new SpecificationRepositoryImpl();
const variantRepository = new VariantRepositoryImpl();
const brandRepository = new BrandRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();
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

export const getProductByIdService = async (productId: string) => {
  const product = await productRepository.findProductById(productId);
  const brand = await brandRepository.getBrandById(String(product?.brandId));
  const category = await categoryRepository.getCategoryById(
    String(product?.categoryId)
  );
  const result = {
    product,
    brand,
    category,
  };
  return result;
};
export const getProductsActiveService = async () => {
  const products = await productRepository.getProductsActive();

  return products;
};
export const updateProductService = async (
  productId: string,
  formData: Partial<IProduct>
) => {
  const updateProductDTO = await createAndValidateDto(
    UpdateProductDTO,
    formData
  );
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
      const product = await productRepository.findProductById(id);
      if (product?.isDeleted) {
        await productRepository.updateProduct(id, { isDeleted: false });
      } else {
        await productRepository.updateProduct(id, { isDeleted: true });
      }
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

export const getFilterProductService = async (formFilter: any) => {
  const formFilterData = await createAndValidateDto(
    FilterProductDto,
    formFilter
  );

  // Nếu có URL nhưng không có categoryId, lấy categoryId từ URL
  if (formFilterData?.url && !formFilterData?.categoryId) {
    const category = await categoryRepository.getCategoryByUrl(
      formFilterData.url
    );
    if (category) {
      formFilterData.categoryId = category.id;
    }
  }

  // Nếu không có brandId và categoryId thì trả về tất cả sản phẩm
  if (!formFilterData?.brandId && !formFilterData?.categoryId) {
    return await productRepository.getProducts();
  }

  // Nếu có brandId nhưng không có categoryId
  if (formFilterData?.brandId && !formFilterData?.categoryId) {
    return await productRepository.findProductByBrand(formFilterData.brandId);
  }

  // Nếu có categoryId nhưng không có brandId
  if (!formFilterData?.brandId && formFilterData?.categoryId) {
    return await productRepository.findProductByCategory(
      formFilterData.categoryId
    );
  }

  // Nếu có cả brandId và categoryId
  return await productRepository.findProductByBrandAndCategory(
    formFilterData.brandId,
    formFilterData.categoryId
  );
};

export const getProductSpecialService = async () => {
  const getBrands = await brandRepository.getBrandsActive();
  const getProducts = await productRepository.getProductsActive();
  const getCategories = await categoryRepository.getCategoriesActive();
  const result = getCategories.map((category) => {
    return {
      categoryId: category.id,
      categoryName: category.name,
      brands: getBrands
        .filter((brand) => brand.categoryIds.includes(category.id))
        .map((item) => {
          return {
            _id: item._id,
            name: item.name,
          };
        }),
      products: getProducts
        .filter(
          (product) => String(product.categoryId) === String(category._id)
        )
        .map((item) => {
          return {
            _id: item._id,
            name: item.name,
            price: item.variants?.length
              ? item.variants?.[0].price
              : item.price,
            imageThumbnailUrl: item.imageThumbnailUrl,
          };
        }),
    };
  });
  return result;
};
