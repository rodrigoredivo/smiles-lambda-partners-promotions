import { HttpRequest, HttpResponse } from "../protocols/http";
import { MissingParamError } from "../errors/missing-param-error";
import SearchPromotionsUseCase from "../../../application/promotions/use-cases/get-promotions";

export default class PromotionsController {
  private readonly externalAdapter: SearchPromotionsUseCase;

  constructor(externalAdapter: SearchPromotionsUseCase) {
    this.externalAdapter = externalAdapter;
  }

  searchPromotions(req: HttpRequest<any, any>): HttpResponse<any> {
    
    if (req.query) {
      const { partnerAlias } = req.query;
      

      if (!partnerAlias)
        return {
          statusCode: 400,
          body: new MissingParamError("partnerAlias"),
        };

      this.externalAdapter.searchActiveAndInactive(partnerAlias);
    }

    return {
      statusCode: 400,
      body: new MissingParamError("partnerAlias"),
    };

  }

  filterAndSortPromotions(req: HttpRequest<any, any>) {

    if (req.query) {
      const { startDate, endDate, type } = req.query;

      const filteredPromotions = this.externalAdapter.filterAndSort(
        startDate ? new Date(startDate.toString()) : undefined,
        endDate ? new Date(endDate.toString()) : undefined,
        type ? type.toString() : undefined
      );

      return filteredPromotions;

    }

    return [];
  }
}
