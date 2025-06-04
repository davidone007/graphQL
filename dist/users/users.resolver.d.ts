import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    getCurrentUser(user: User): User;
    updateUser(id: string, updateUserInput: UpdateUserInput, currentUser: User): Promise<User>;
    removeUser(id: string, currentUser: User): Promise<boolean>;
}
