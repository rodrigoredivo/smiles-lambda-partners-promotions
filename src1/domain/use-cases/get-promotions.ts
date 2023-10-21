import Promotion from "../entity/promotion";

export interface GetPromotions {
    get(partnerAlias: string): Promise<Promotion[]>;
    filter(startDate?: Date, endDate?: Date, type?: string): Promise<Promotion[]>;
}