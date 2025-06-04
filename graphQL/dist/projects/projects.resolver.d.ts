import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
export declare class ProjectsResolver {
    private readonly projectsService;
    private readonly usersService;
    constructor(projectsService: ProjectsService, usersService: UsersService);
    createProject(createProjectInput: CreateProjectInput, user: User): Promise<Project>;
    findAll(user: User): Promise<Project[]>;
    findOne(id: string, user: User): Promise<Project>;
    findByOwner(ownerId: string): Promise<Project[]>;
    updateProject(id: string, updateProjectInput: UpdateProjectInput, user: User): Promise<Project>;
    removeProject(id: string, user: User): Promise<boolean>;
    owner(project: Project): Promise<User>;
}
