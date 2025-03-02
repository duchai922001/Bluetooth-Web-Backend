import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
const specificationRepo = new SpecificationRepositoryImpl();
const categoryRepo = new CategoryRepositoryImpl();
const productRepo = new ProductRepositoryImpl();
export const SpecificationService = {
  createSpecification: async (categoryId: string, type: any) => {
    const specificationsToInsert = type.map((group: any) => ({
      categoryId,
      groupName: group.groupName,
      specifications: group.specifications.map((spec: any) => ({
        name: spec.name,
        checkedFilter: spec.checkedFilter,
      })),
    }));
    const createdSpecifications = await specificationRepo.createSpecifications(
      specificationsToInsert
    );
    return createdSpecifications;
  },
  getSpecificationByCategoryId: async (categoryId: string) => {
    return await specificationRepo.getSpecificationByCategoryId(categoryId);
  },

  getSpecificationFilterByCategoryUrl: async (url: string) => {
    const findCategory = await categoryRepo.getCategoryByUrl(url);
    if (!findCategory) {
      throw new NotFoundException("Not found category");
    }

    // Lấy danh sách sản phẩm theo category
    const productCategories = await productRepo.findProductByCategory(
      findCategory._id as string
    );

    // Map lưu trữ specifications theo key và values (dạng Set để tránh trùng lặp)
    const specMap: Record<string, Set<string>> = {};

    productCategories.forEach((category) => {
      category.specifications.forEach((spec: any) => {
        spec.specificationsSub.forEach((subSpec: any) => {
          if (!specMap[subSpec.key]) {
            specMap[subSpec.key] = new Set();
          }
          specMap[subSpec.key].add(subSpec.value.trim());
        });
      });
    });

    // Lấy danh sách specifications của category
    const specificationsOfCategory =
      await specificationRepo.getSpecificationByCategoryId(
        findCategory._id as string
      );

    // Tạo danh sách các tên specifications có checkedFilter: true
    const checkedNames = new Set(
      specificationsOfCategory.flatMap((category: any) =>
        category.specifications
          .filter((spec: any) => spec.checkedFilter)
          .map((spec: any) => spec.name)
      )
    );

    // Lọc specMap để chỉ giữ lại các specifications có checkedFilter: true
    return Object.entries(specMap)
      .filter(([key]) => checkedNames.has(key)) // Chỉ giữ lại key có checkedFilter: true
      .map(([key, values]) => ({
        nameFilter: key,
        values: [...values],
      }));
  },
};
