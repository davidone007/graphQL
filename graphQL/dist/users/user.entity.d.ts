import { UserRole } from '../common/enums/user-role.enum';
import { Project } from '../projects/project.entity';
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    projects?: Project[];
    get fullName(): string;
}
