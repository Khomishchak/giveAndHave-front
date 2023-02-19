import { User } from "./user";

export class Transaction {

    createdAt: string;
    cost: number;

    client: User;
    freelancer: User;
}
