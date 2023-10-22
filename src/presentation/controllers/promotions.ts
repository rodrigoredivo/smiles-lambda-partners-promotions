import { MissingParamError } from "../../domain/errors/missing-param-error";
import { GetPromotions } from "../../domain/use-cases/get-promotions";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";

export class PromotionsController implements Controller {

    constructor(private readonly getPromotions: GetPromotions) {}

    async handle (Request: HttpRequest): Promise<HttpResponse> {

        try {
            if (Request.query) {
                const { partnerAlias } = Request.query;
                
                if (!partnerAlias)
                  return {
                    statusCode: 400,
                    data: new MissingParamError("partnerAlias"),
                  };
          
                const promotions = await this.getPromotions.get(partnerAlias)
                return {
                    statusCode: 200,
                    data: promotions
                }
            }
            return {
                statusCode: 400,
                data: new MissingParamError("partnerAlias"),
            };
            
        } catch (error) {
            return {
                statusCode: 400,
                data: error,
            }
        }

    }
}