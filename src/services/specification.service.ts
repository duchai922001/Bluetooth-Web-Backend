import { IProductSpecification } from "../infrastructure/model/productSpecification.model";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
import { SpecificationDTO } from "../presentations/dtos/specification/specification.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const specificationRepository = new SpecificationRepositoryImpl();

export const SpecificationService = {
  createSpecification: async (specification: IProductSpecification) => {
    const createSpecificationDTO = await createAndValidateDto(
      SpecificationDTO,
      specification
    );
    return await specificationRepository.createSpecification(
      createSpecificationDTO
    );
  },
  getSpecificationByCategoryId: async (categoryId: string) => {
    return await specificationRepository.getSpecificationByCategoryId(
      categoryId
    );
  },
};
