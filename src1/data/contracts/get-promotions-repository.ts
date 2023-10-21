import { PromotionModel } from "../models/get-promotions-model";

export interface GetPromotionsRepository {
    searchActiveAndInactive: (partnerAlias: string) => Promise<PromotionModel[]>;
    filterAndSort: (startDate?: Date, endDate?: Date, type?: string) => Promise<PromotionModel[]>;
}