import { MemberError } from "../../domain/errors/error-member";
import { GetMember } from "../../domain/use-cases/get-member";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { MemberModel } from "../models/get-member";

export class MemberController implements Controller {

    constructor (private readonly getMember: GetMember) {}

    async handle (Request: HttpRequest): Promise<HttpResponse<MemberModel>> {
        try {
            if(Request.query) {
                const { cpf } = Request.query;
    
                if (!cpf) {
                    return {
                        statusCode: 400,
                        data: {
                            error: new MemberError()
                        }
                    }
                }
                const member = await this.getMember.get(cpf)
                return {
                    statusCode: 200,
                    data: {
                        member: {
                            firstName: member.firstName,
                            lastName: member.lastName,
                            email: member.email,
                            memberNumber: member.memberNumber,
                            document: member.document,
                            birthDay: member.birthDay
                        }
                    }
                }
            }

            return {
                statusCode: 400,
                data: {
                    error: new MemberError()
                }
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                data: {
                    error: new MemberError()
                }
            }
            
        }
        
    };
    
}