import { describe, expect, test } from 'vitest'
import { GetMemberSiebelRepository } from '../../../infra/repositories/get-member-siebel';
import getMemberService from '../../../data/services/get-member'
import { Member } from '../../../domain/entity/member';
import member from '../../../infra/data-sources/member';
import { MemberController } from '../../../presentation/controllers/member';
import { MemberError } from '../../../domain/errors/error-member';

export class mockRepositorySiebel implements GetMemberSiebelRepository {
    async searchMember(cpf: string): Promise<Member> {
        return member
    } 
}

describe('MemberController siebel repository', () => {

  test('should return 400 with MemberError if query is missing', async () => {
    const mockRepositorymock = new mockRepositorySiebel();
    const mockUseCase = new getMemberService(mockRepositorymock);
    const controller = new MemberController(mockUseCase);
    const request = {};

    const response = await controller.handle(request);
    
    expect(response.statusCode).toBe(400);
    expect(response.data.error).toBeInstanceOf(MemberError);
  });

  test('should return 400 with MissingParamError if partnerAlias is missing', async () => {
    const mockRepositorymock = new mockRepositorySiebel();
    const mockUseCase = new getMemberService(mockRepositorymock);
    const controller = new MemberController(mockUseCase);
    const request = { query: {} };

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.data.error).toBeInstanceOf(MemberError);
  });

  test('should return 200 with promotions if partnerAlias is provided', async () => {
    const mockRepositorymock = new mockRepositorySiebel();
    const mockUseCase = new getMemberService(mockRepositorymock);
    const controller = new MemberController(mockUseCase);
    const request = { query: { cpf: '99900088877' }};

    const response = await controller.handle(request);
    
    expect(response.statusCode).toBe(200);
    expect(response.data.member).not.toBeNull()
  });
});