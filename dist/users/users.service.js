"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./user.entity");
const user_role_enum_1 = require("../common/enums/user-role.enum");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserInput) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserInput.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserInput.password, 12);
        const user = this.usersRepository.create({
            ...createUserInput,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async findAll() {
        return this.usersRepository.find({
            relations: ['projects'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOneById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['projects'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findOneByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['projects'],
        });
    }
    async update(id, updateUserInput, currentUser) {
        const user = await this.findOneById(id);
        if (currentUser.role !== user_role_enum_1.UserRole.SUPERADMIN && currentUser.id !== id) {
            throw new common_1.BadRequestException('You can only update your own profile');
        }
        if (updateUserInput.role && currentUser.role !== user_role_enum_1.UserRole.SUPERADMIN) {
            throw new common_1.BadRequestException('Only superadmin can change user roles');
        }
        if (updateUserInput.password) {
            updateUserInput.password = await bcrypt.hash(updateUserInput.password, 12);
        }
        Object.assign(user, updateUserInput);
        return this.usersRepository.save(user);
    }
    async remove(id, currentUser) {
        if (currentUser.role !== user_role_enum_1.UserRole.SUPERADMIN) {
            throw new common_1.BadRequestException('Only superadmin can delete users');
        }
        if (currentUser.id === id) {
            throw new common_1.BadRequestException('You cannot delete your own account');
        }
        const user = await this.findOneById(id);
        await this.usersRepository.remove(user);
        return true;
    }
    async validateUser(email, password) {
        const user = await this.findOneByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map