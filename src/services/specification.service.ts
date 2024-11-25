import { IProductSpecification } from "../infrastructure/model/productSpecification.model";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
import { SpecificationDTO } from "../presentations/dtos/specification/specification.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const specificationRepository = new SpecificationRepositoryImpl();
export const createSpecification = async (
  specification: IProductSpecification
) => {
  const createSpecificationDTO = await createAndValidateDto(
    SpecificationDTO,
    specification
  );
  return await specificationRepository.createSpecification(
    createSpecificationDTO
  );
};
