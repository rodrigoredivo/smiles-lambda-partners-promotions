import { Member } from "../entity/member";

export interface GetMember {
    get (cpf: string): Promise<Member>;
}