import { User } from "./user";

export class Transaction {

    id: number;

    createdAt: string;
    cost: number;

    receiver: User;
    sender: User;
}
