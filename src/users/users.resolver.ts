import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @Roles(UserRole.SUPERADMIN)
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput }, ValidationPipe)
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Query(() => User, { name: 'me' })
  getCurrentUser(@CurrentUser() user: User): User {
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput', { type: () => UpdateUserInput }, ValidationPipe)
    updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput, currentUser);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.SUPERADMIN)
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ): Promise<boolean> {
    return this.usersService.remove(id, currentUser);
  }
}
