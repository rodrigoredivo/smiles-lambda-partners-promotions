import { Member } from "../../domain/entity/member";
import { GetMember } from "../../domain/use-cases/get-member";
import { GetMemberRepository } from "../contracts/get-member-repository";

export default class getMemberService implements GetMember {

    constructor (private readonly getMemberRepository: GetMemberRepository) {}

    async get(cpf: string): Promise<Member> {
        return this.getMemberRepository.searchMember(cpf)
    }

}