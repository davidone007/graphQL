import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status?: string;
}

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {}
