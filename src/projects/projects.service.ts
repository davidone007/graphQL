import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { User } from '../users/user.entity';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(
    createProjectInput: CreateProjectInput,
    user: User,
  ): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectInput,
      ownerId: user.id,
      status: createProjectInput.status || 'active',
    });

    return this.projectsRepository.save(project);
  }

  async findAll(user: User): Promise<Project[]> {
    // Superadmin puede ver todos los proyectos
    if (user.role === UserRole.SUPERADMIN) {
      return this.projectsRepository.find({
        relations: ['owner'],
        order: { createdAt: 'DESC' },
      });
    }

    // Usuario regular solo ve sus propios proyectos
    return this.projectsRepository.find({
      where: { ownerId: user.id },
      relations: ['owner'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Verificar permisos
    if (user.role !== UserRole.SUPERADMIN && project.ownerId !== user.id) {
      throw new ForbiddenException('You can only access your own projects');
    }

    return project;
  }

  async findByOwner(ownerId: string): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { ownerId },
      relations: ['owner'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    updateProjectInput: UpdateProjectInput,
    user: User,
  ): Promise<Project> {
    const project = await this.findOne(id, user);

    // Verificar permisos
    if (user.role !== UserRole.SUPERADMIN && project.ownerId !== user.id) {
      throw new ForbiddenException('You can only update your own projects');
    }

    Object.assign(project, updateProjectInput);
    return this.projectsRepository.save(project);
  }

  async remove(id: string, user: User): Promise<boolean> {
    const project = await this.findOne(id, user);

    // Verificar permisos
    if (user.role !== UserRole.SUPERADMIN && project.ownerId !== user.id) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    await this.projectsRepository.remove(project);
    return true;
  }
}
