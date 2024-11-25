import { IBrand } from "../infrastructure/model/brand.model";
import { BrandRepositoryImpl } from "../infrastructure/repositoriesImpl/brand.reposity.impl";
import { BrandDTO } from "../presentations/dtos/brand/brand.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const brandRepository = new BrandRepositoryImpl();
export const createBrandService = async (brand: Partial<IBrand>) => {
  const createBrandDTO = await createAndValidateDto(BrandDTO, brand);
  return await brandRepository.createBrand(createBrandDTO);
};

export const deleteSoftBrandService = async (brandId: string) => {
  const arrBrandIds = brandId.split(",").map((id) => id.trim());
  await Promise.all(
    arrBrandIds.map(
      async (id) => await brandRepository.updateIsDeleted(id, true)
    )
  );
};

export const restoreBrandService = async (brandId: string) => {
  const arrBrandIds = brandId.split(",").map((id) => id.trim());
  await Promise.all(
    arrBrandIds.map(
      async (id) => await brandRepository.updateIsDeleted(id, false)
    )
  );
};
