import { describe, expect, test, vitest } from 'vitest'
import { PromotionsController } from '../../../presentation/controllers/promotions';
import { MissingParamError } from '../../../domain/errors/missing-param-error';
import GetPromotionsService from '../../../data/services/get-promotions';
import Promotion from '../../../domain/entity/promotion';
import { GetPromotionsSiebelRepository } from '../../../infra/repositories/get-promotions-siebel'
import { siebelPromotions, promotionsOracle } from '../../../infra/data-sources/promotions';
import { GetPromotionsOracleRepository } from '../../../infra/repositories/get-promotions-oracle';

export class mockRepositorySiebel implements GetPromotionsSiebelRepository {
    async searchActiveAndInactive(partnerAlias: string): Promise<Promotion[]> {
        return siebelPromotions.SiebelMessage.GOLLOYPromotion.map(item => ({
            id: item.PromotionId,
            name: item.PromotionName,
            startDate: new Date(item.PromotionStartDate),
            endDate: new Date(item.PromotionEndDate),
            type: 'Y'
        }));
    }
    async filterAndSort(startDate?: Date | undefined, endDate?: Date | undefined, type?: string | undefined): Promise<Promotion[]> {
        throw new Error('Method not implemented.');
    }
 
}

export class mockRepositoryOracle implements GetPromotionsOracleRepository {
  async searchActiveAndInactive(partnerAlias: string): Promise<Promotion[]> {
      return promotionsOracle.OracleMessage.GOLLOYPromotion.map(item => ({
          id: item.PromotionId,
          name: item.PromotionName,
          startDate: new Date(item.PromotionStartDate),
          endDate: new Date(item.PromotionEndDate),
          type: 'Y'
      }));
  }
  async filterAndSort(startDate?: Date | undefined, endDate?: Date | undefined, type?: string | undefined): Promise<Promotion[]> {
      throw new Error('Method not implemented.');
  }

}

describe('PromotionsController siebel repository', () => {

  test('should return 400 with MissingParamError if query is missing', async () => {
    const mockRepositorymock = new mockRepositorySiebel();
    const mockUseCase = new GetPromotionsService(mockRepositorymock);
    const controller = new PromotionsController(mockUseCase);
    const request = {};

    const response = await controller.handle(request);
    
    expect(response.statusCode).toBe(400);
    expect(response.data).toBeInstanceOf(MissingParamError);
  });

  test('should return 400 with MissingParamError if partnerAlias is missing', async () => {
    const mockRepositorymock = new mockRepositorySiebel();
    const mockUseCase = new GetPromotionsService(mockRepositorymock);
    const controller = new PromotionsController(mockUseCase);
    const request = { query: {} };

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.data).toBeInstanceOf(MissingParamError);
  });

  test('should return 200 with promotions if partnerAlias is provided', async () => {
    const mockRepositorymock = new mockRepositorySiebel();
    const mockUseCase = new GetPromotionsService(mockRepositorymock);
    const controller = new PromotionsController(mockUseCase);
    const request = { query: { partnerAlias: 'validAlias' }};

    const response = await controller.handle(request);
    
    expect(response.statusCode).toBe(200);
  });
});

describe('PromotionsController oracle repository', () => {

  test('should return 400 with MissingParamError if query is missing', async () => {
    const mockRepositorymock = new mockRepositoryOracle();
    const mockUseCase = new GetPromotionsService(mockRepositorymock);
    const controller = new PromotionsController(mockUseCase);
    const request = {};

    const response = await controller.handle(request);
    
    expect(response.statusCode).toBe(400);
    expect(response.data).toBeInstanceOf(MissingParamError);
  });

  test('should return 400 with MissingParamError if partnerAlias is missing', async () => {
    const mockRepositorymock = new mockRepositoryOracle();
    const mockUseCase = new GetPromotionsService(mockRepositorymock);
    const controller = new PromotionsController(mockUseCase);
    const request = { query: {} };

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.data).toBeInstanceOf(MissingParamError);
  });

  test('should return 200 with promotions if partnerAlias is provided', async () => {
    const mockRepositorymock = new mockRepositoryOracle();
    const mockUseCase = new GetPromotionsService(mockRepositorymock);
    const controller = new PromotionsController(mockUseCase);
    const request = { query: { partnerAlias: 'validAlias' }};

    const response = await controller.handle(request);
    
    expect(response.statusCode).toBe(200);
  });
});


