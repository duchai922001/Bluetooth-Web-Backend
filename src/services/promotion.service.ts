import { IPromotion } from "../infrastructure/model/promotion.model";
import { PromotionRepositoryImpl } from "../infrastructure/repositoriesImpl/promotion.repository.impl";
import { PromotionDTO } from "../presentations/dtos/promotion/promotion.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const promotionRepository = new PromotionRepositoryImpl();
export const PromotionService = {
  createPromotion: async (promotionData: IPromotion) => {
    const createPromotionDTO = await createAndValidateDto(
      PromotionDTO,
      promotionData
    );
    return await promotionRepository.createPromotion(createPromotionDTO);
  },
  updatePromotion: async (promotionId: string, updateData: IPromotion) => {
    return await promotionRepository.updatePromotion(promotionId, updateData);
  },
  deletePromotion: async (promotionId: string) => {
    return await promotionRepository.deletePromotion(promotionId);
  },
  getPromotion: async (promotionId: string) => {
    return await promotionRepository.getPromotion(promotionId);
  },
};
