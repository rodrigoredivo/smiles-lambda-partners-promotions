export class MemberError extends Error {
    constructor(){
        super('Member not found')
        this.name = 'MemberError'
    }
}