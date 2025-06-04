import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginInput, CreateUserInput } from '../users/dto/user.input';
import { AuthPayload } from '../users/dto/auth-payload.dto';
import { User } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginInput: LoginInput): Promise<AuthPayload>;
    register(createUserInput: CreateUserInput): Promise<AuthPayload>;
    validateUser(id: string): Promise<User>;
}
