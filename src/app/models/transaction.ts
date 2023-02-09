import { User } from "./user";

export class Transaction {


    createdAt: number;
    cost: number;

    client: User;
    freelancer: User;
}
