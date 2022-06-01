import { Status } from "../enum/policy-enum";

export interface IPolicy {
    id: string,
    name: string,
    age: number,
    amount: number,
    address: string,
    startDate: Date,
    endDate: Date,
    status: Status
}