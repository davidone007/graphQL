import { UserRole } from '../../common/enums/user-role.enum';
export declare class CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
}
declare const UpdateUserInput_base: import("@nestjs/common").Type<Partial<CreateUserInput>>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    isActive?: boolean;
}
export declare class LoginInput {
    email: string;
    password: string;
}
export {};
