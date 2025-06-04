"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = exports.InsufficientPermissionsException = exports.InvalidCredentialsException = exports.ProjectNotFoundException = exports.UserNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class UserNotFoundException extends common_1.HttpException {
    constructor(id) {
        super(`User with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class ProjectNotFoundException extends common_1.HttpException {
    constructor(id) {
        super(`Project with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ProjectNotFoundException = ProjectNotFoundException;
class InvalidCredentialsException extends common_1.HttpException {
    constructor() {
        super('Invalid email or password', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
class InsufficientPermissionsException extends common_1.HttpException {
    constructor(action) {
        super(`Insufficient permissions${action ? ` to ${action}` : ''}`, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.InsufficientPermissionsException = InsufficientPermissionsException;
class UserAlreadyExistsException extends common_1.HttpException {
    constructor(email) {
        super(`User with email ${email} already exists`, common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=custom.exceptions.js.map