
import Promotion from "../../../domain/promotions/entity/promotion";

export default interface SearchPromotionsUseCase {
  searchActiveAndInactive(partnerAlias: string): Promotion[];
  filterAndSort(startDate?: Date, endDate?: Date, type?: string): Promotion[];
}
