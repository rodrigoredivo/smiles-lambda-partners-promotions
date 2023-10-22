import { GetPromotionsRepository } from "../../data/contracts/get-promotions-repository";
import { PromotionModel } from "../../data/models/get-promotions-model";
import { promotionsOracle } from '../data-sources/promotions';

export class GetPromotionsOracleRepository implements GetPromotionsRepository {

    async searchActiveAndInactive(partnerAlias: string): Promise<PromotionModel[]> {
        return promotionsOracle.OracleMessage.GOLLOYPromotion.map(item => ({
            id: item.PromotionId,
            name: item.PromotionName,
            startDate: new Date(item.PromotionStartDate),
            endDate: new Date(item.PromotionEndDate),
            type: 'Y'
        }));
    };
    
    async filterAndSort(startDate?: Date, endDate?: Date, type?: string): Promise<PromotionModel[]> {
        return [];
    };

}