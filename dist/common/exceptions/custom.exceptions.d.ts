import { HttpException } from '@nestjs/common';
export declare class UserNotFoundException extends HttpException {
    constructor(id: string);
}
export declare class ProjectNotFoundException extends HttpException {
    constructor(id: string);
}
export declare class InvalidCredentialsException extends HttpException {
    constructor();
}
export declare class InsufficientPermissionsException extends HttpException {
    constructor(action?: string);
}
export declare class UserAlreadyExistsException extends HttpException {
    constructor(email: string);
}
