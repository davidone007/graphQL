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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../users/user.entity");
const project_entity_1 = require("../projects/project.entity");
const user_role_enum_1 = require("../common/enums/user-role.enum");
let SeedService = SeedService_1 = class SeedService {
    usersRepository;
    projectsRepository;
    logger = new common_1.Logger(SeedService_1.name);
    constructor(usersRepository, projectsRepository) {
        this.usersRepository = usersRepository;
        this.projectsRepository = projectsRepository;
    }
    async seed() {
        this.logger.log('Starting database seeding...');
        const userCount = await this.usersRepository.count();
        if (userCount > 0) {
            this.logger.log('Database already seeded');
            return;
        }
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const superadmin = this.usersRepository.create({
            email: 'admin@example.com',
            firstName: 'Super',
            lastName: 'Admin',
            password: hashedPassword,
            role: user_role_enum_1.UserRole.SUPERADMIN,
            isActive: true,
        });
        const savedSuperadmin = await this.usersRepository.save(superadmin);
        const userPassword = await bcrypt.hash('user123', 12);
        const regularUser = this.usersRepository.create({
            email: 'user@example.com',
            firstName: 'Regular',
            lastName: 'User',
            password: userPassword,
            role: user_role_enum_1.UserRole.USER,
            isActive: true,
        });
        const savedUser = await this.usersRepository.save(regularUser);
        const projects = [
            {
                name: 'E-commerce Platform',
                description: 'Building a modern e-commerce platform with React and Node.js',
                status: 'active',
                ownerId: savedSuperadmin.id,
            },
            {
                name: 'Mobile App Development',
                description: 'Developing a cross-platform mobile application',
                status: 'in-progress',
                ownerId: savedUser.id,
            },
            {
                name: 'Data Analytics Dashboard',
                description: 'Creating a comprehensive analytics dashboard for business intelligence',
                status: 'completed',
                ownerId: savedSuperadmin.id,
            },
            {
                name: 'Personal Portfolio',
                description: 'Building a personal portfolio website to showcase projects',
                status: 'active',
                ownerId: savedUser.id,
            },
        ];
        for (const projectData of projects) {
            const project = this.projectsRepository.create(projectData);
            await this.projectsRepository.save(project);
        }
        this.logger.log('Database seeding completed successfully!');
        this.logger.log('Superadmin credentials: admin@example.com / admin123');
        this.logger.log('Regular user credentials: user@example.com / user123');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map