export type Member = {
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