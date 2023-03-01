import { User } from "./user";
import { Task } from "./task";

export class Application {

    id: number;

    status: boolean

    task: Task;
    user: User;
}
