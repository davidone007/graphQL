import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../common/enums/user-role.enum';
import { Project } from '../projects/project.entity';

// Registrar el enum para GraphQL
registerEnumType(UserRole, {
  name: 'UserRole',
});

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  @IsString()
  @MinLength(2)
  firstName: string;

  @Column()
  @Field()
  @IsString()
  @MinLength(2)
  lastName: string;

  @Column()
  // No exponemos la contraseña en GraphQL
  @IsString()
  @MinLength(6)
  password: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  // Relación con proyectos
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Project, (project) => project.owner)
  @Field(() => [Project], { nullable: true })
  projects?: Project[];

  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
