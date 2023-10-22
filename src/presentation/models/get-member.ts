export type MemberModel = {
    member?: member
    error?: any
}

type member = {
    firstName: string;
    lastName: string;
    memberNumber: string;
    email: string;
    birthDay: string;
    document: documentType;
}

type documentType = {
    type: string;
    value: string
}