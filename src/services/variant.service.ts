import { IProductVariant } from "../infrastructure/model/productVariant.model";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";
import { VariantDTO } from "../presentations/dtos/variant/variant.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const variantRepository = new VariantRepositoryImpl();
export const createVariantService = async (
  variant: IProductVariant
): Promise<IProductVariant> => {
  const createVariantDto = await createAndValidateDto(VariantDTO, variant);
  return await variantRepository.createVariant(createVariantDto);
};
