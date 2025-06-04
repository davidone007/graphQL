import { User } from '../users/user.entity';
export declare class Project {
    id: string;
    name: string;
    description?: string;
    status: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
}
