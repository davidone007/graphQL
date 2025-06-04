import { AuthService } from './auth.service';
import { AuthPayload } from '../users/dto/auth-payload.dto';
import { LoginInput, CreateUserInput } from '../users/dto/user.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<AuthPayload>;
    register(createUserInput: CreateUserInput): Promise<AuthPayload>;
}
