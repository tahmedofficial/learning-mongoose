import { Model } from "mongoose"

export interface IAddress {
    city: string,
    street: string,
    zip: string
}

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    age: number,
    role: "user" | "admin",
    address: IAddress
}

export interface UserInstanceMethods {
    hashPassword(password: string): string
}

export interface UserStaticMethods extends Model<IUser> {
    hashPassword(password: string): string
}

