import { describe, expect, test, vitest } from 'vitest'
import { MissingParamError } from '../errors/missing-param-error'
import PromotionsController from './promotions-controller'
import SearchPromotionsUseCase from '../../../application/promotions/use-cases/get-promotions'
import Promotion from '../../../domain/promotions/entity/promotion'


class MockSearchPromotionsUseCase implements SearchPromotionsUseCase {
    private searchActiveAndInactiveCalledWith: string | undefined = undefined;
    private filterAndSortCalledWith: { startDate?: Date, endDate?: Date, type?: string } | undefined = undefined;
    private simulatedFilteredPromotions: Promotion[] = [];
  
    searchActiveAndInactive(partnerAlias: string): Promotion[] {
      this.searchActiveAndInactiveCalledWith = partnerAlias;
      return [];
    }
  
    getSearchActiveAndInactiveCalledWith(): string | undefined {
      return this.searchActiveAndInactiveCalledWith;
    }
  
    filterAndSort(startDate?: Date | undefined, endDate?: Date | undefined, type?: string | undefined): Promotion[] {
        this.filterAndSortCalledWith = { startDate, endDate, type };
        return this.simulatedFilteredPromotions;
    }
    
    setSimulatedFilteredPromotions(promotions: Promotion[]): void {
    this.simulatedFilteredPromotions = promotions;
    }

    getFilterAndSortCalledWith(): { startDate?: Date, endDate?: Date, type?: string } | undefined {
    return this.filterAndSortCalledWith;
    }
}

describe('Promotions Controller', () => {
    test('Should return 400 if partnerAlias as query parameter is not provided', () => {
      const mockUseCase = new MockSearchPromotionsUseCase();
      const sut = new PromotionsController(mockUseCase);
  
      const httpRequest = {};
  
      const response = sut.searchPromotions(httpRequest);
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(MissingParamError);
      expect(response.body.message).toBe('Missing partnerAlias');
    });
  
    test('Should call searchActiveAndInactive with the correct partnerAlias', () => {
      const mockUseCase = new MockSearchPromotionsUseCase();
      const sut = new PromotionsController(mockUseCase);
  
      const partnerAlias = 'examplePartnerAlias';
      const httpRequest = {
        query: {
          partnerAlias,
        },
      };
  
      sut.searchPromotions(httpRequest);
  
      expect(mockUseCase.getSearchActiveAndInactiveCalledWith()).toBe(partnerAlias);
    });

    test('Should call filterAndSort with the correct parameters', () => {
        const mockUseCase = new MockSearchPromotionsUseCase();
        const sut = new PromotionsController(mockUseCase);
    
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2023-12-31');
        const type = 'exampleType';
    
        const httpRequest = {
          query: {
            startDate,
            endDate,
            type,
          },
        };
    
    
        const simulatedFilteredPromotions = [
          {
            id: '1',
            name: 'promotion1',
            startDate: startDate,
            endDate: endDate,
            type: type,
          },
        ];
    
        mockUseCase.setSimulatedFilteredPromotions(simulatedFilteredPromotions);
    
        sut.filterAndSortPromotions(httpRequest);
    
        expect(mockUseCase.getFilterAndSortCalledWith()).toEqual({
          startDate,
          endDate,
          type,
        });
    
        expect(sut.filterAndSortPromotions(httpRequest)).toEqual(simulatedFilteredPromotions);
    });

    test('Should return an empty array when called with incorrect parameters', () => {
        const mockUseCase = new MockSearchPromotionsUseCase();
        const sut = new PromotionsController(mockUseCase);
    
        const httpRequest = {
          query: {},
        };
    
        const result = sut.filterAndSortPromotions(httpRequest);
    
        expect(result).toEqual([]);
    });
  
});