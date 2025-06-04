import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { User } from '../users/user.entity';
export declare class ProjectsService {
    private projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    create(createProjectInput: CreateProjectInput, user: User): Promise<Project>;
    findAll(user: User): Promise<Project[]>;
    findOne(id: string, user: User): Promise<Project>;
    findByOwner(ownerId: string): Promise<Project[]>;
    update(id: string, updateProjectInput: UpdateProjectInput, user: User): Promise<Project>;
    remove(id: string, user: User): Promise<boolean>;
}
