import Promotion from "../../domain/entity/promotion";
import { GetPromotions } from "../../domain/use-cases/get-promotions";
import { GetPromotionsRepository } from "../contracts/get-promotions-repository";

export default class GetPromotionsService implements GetPromotions {
    constructor(private readonly getPromotionsRepository: GetPromotionsRepository){}
    
    async get(partnerAlias: string): Promise<Promotion[]> {
        return this.getPromotionsRepository.searchActiveAndInactive(partnerAlias)
    }

    async filter(startDate?: Date | undefined, endDate?: Date | undefined, type?: string | undefined): Promise<Promotion[]> {
        return this.getPromotionsRepository.filterAndSort()
    }
    
  
}
  