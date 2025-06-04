import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserInput: UpdateUserInput, currentUser: User): Promise<User>;
    remove(id: string, currentUser: User): Promise<boolean>;
    validateUser(email: string, password: string): Promise<User | null>;
}
