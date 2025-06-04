import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayload } from '../users/dto/auth-payload.dto';
import { LoginInput, CreateUserInput } from '../users/dto/user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(
    @Args('loginInput', { type: () => LoginInput }, ValidationPipe)
    loginInput: LoginInput,
  ): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  async register(
    @Args('createUserInput', { type: () => CreateUserInput }, ValidationPipe)
    createUserInput: CreateUserInput,
  ): Promise<AuthPayload> {
    return this.authService.register(createUserInput);
  }
}
