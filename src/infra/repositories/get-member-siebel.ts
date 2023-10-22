import { GetMemberRepository } from "../../data/contracts/get-member-repository";
import { MemberModel } from "../../data/models/get-member-model";
import member from '../data-sources/member'

export class GetMemberSiebelRepository implements GetMemberRepository {

    async searchMember (cpf: string): Promise<MemberModel> {
        return member;
    };

}