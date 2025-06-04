import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
export declare class SeedService {
    private usersRepository;
    private projectsRepository;
    private readonly logger;
    constructor(usersRepository: Repository<User>, projectsRepository: Repository<Project>);
    seed(): Promise<void>;
}
