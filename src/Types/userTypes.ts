export interface IUser {
    number: number,
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
}

export type UsersType = Array<IUser>;