import { Transaction } from "./transaction";
import { Task } from "./task";

export class User {
    
    id: number;

    name: string;
    email: string;
    groupName: string;

    balance: number;
    age: number;

    isVerified: boolean;

    transactions: Transaction;
    tasks: Task;
}
