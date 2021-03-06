import { Status } from "../enum/policy-enum";

export interface IPolicy {
    _id: string,
    name: string,
    age: number,
    amount: number,
    address: string,
    startDate: Date,
    endDate: Date,
    status: Status,
    userId: any 
}