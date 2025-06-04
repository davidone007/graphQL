import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Project)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Project)
  async createProject(
    @Args(
      'createProjectInput',
      { type: () => CreateProjectInput },
      ValidationPipe,
    )
    createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.create(createProjectInput, user);
  }

  @Query(() => [Project], { name: 'projects' })
  async findAll(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectsService.findAll(user);
  }

  @Query(() => Project, { name: 'project' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.findOne(id, user);
  }

  @Query(() => [Project], { name: 'projectsByOwner' })
  async findByOwner(
    @Args('ownerId', { type: () => ID }) ownerId: string,
  ): Promise<Project[]> {
    return this.projectsService.findByOwner(ownerId);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args(
      'updateProjectInput',
      { type: () => UpdateProjectInput },
      ValidationPipe,
    )
    updateProjectInput: UpdateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectInput, user);
  }

  @Mutation(() => Boolean)
  async removeProject(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.projectsService.remove(id, user);
  }

  @ResolveField(() => User)
  async owner(@Parent() project: Project): Promise<User> {
    return this.usersService.findOneById(project.ownerId);
  }
}
