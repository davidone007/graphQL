import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
