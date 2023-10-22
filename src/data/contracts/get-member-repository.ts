import { MemberModel } from "../models/get-member-model";

export interface GetMemberRepository {
    searchMember: (cpf: string) => Promise<MemberModel>;
}