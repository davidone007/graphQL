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
exports.ProjectsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const project_entity_1 = require("./project.entity");
const projects_service_1 = require("./projects.service");
const project_input_1 = require("./dto/project.input");
const gql_auth_guard_1 = require("../common/guards/gql-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
let ProjectsResolver = class ProjectsResolver {
    projectsService;
    usersService;
    constructor(projectsService, usersService) {
        this.projectsService = projectsService;
        this.usersService = usersService;
    }
    async createProject(createProjectInput, user) {
        return this.projectsService.create(createProjectInput, user);
    }
    async findAll(user) {
        return this.projectsService.findAll(user);
    }
    async findOne(id, user) {
        return this.projectsService.findOne(id, user);
    }
    async findByOwner(ownerId) {
        return this.projectsService.findByOwner(ownerId);
    }
    async updateProject(id, updateProjectInput, user) {
        return this.projectsService.update(id, updateProjectInput, user);
    }
    async removeProject(id, user) {
        return this.projectsService.remove(id, user);
    }
    async owner(project) {
        return this.usersService.findOneById(project.ownerId);
    }
};
exports.ProjectsResolver = ProjectsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('createProjectInput', { type: () => project_input_1.CreateProjectInput }, common_1.ValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_input_1.CreateProjectInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "createProject", null);
__decorate([
    (0, graphql_1.Query)(() => [project_entity_1.Project], { name: 'projects' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => project_entity_1.Project, { name: 'project' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [project_entity_1.Project], { name: 'projectsByOwner' }),
    __param(0, (0, graphql_1.Args)('ownerId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "findByOwner", null);
__decorate([
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('updateProjectInput', { type: () => project_input_1.UpdateProjectInput }, common_1.ValidationPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_input_1.UpdateProjectInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "updateProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "removeProject", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_entity_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "owner", null);
exports.ProjectsResolver = ProjectsResolver = __decorate([
    (0, graphql_1.Resolver)(() => project_entity_1.Project),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService,
        users_service_1.UsersService])
], ProjectsResolver);
//# sourceMappingURL=projects.resolver.js.map