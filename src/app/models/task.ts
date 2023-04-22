export class Task {

    id: number;

    subject: string;
    description: string;

    price: number;

    taskActive: boolean;
    isUsersTask: boolean;

    deadline: Date | null;
}
