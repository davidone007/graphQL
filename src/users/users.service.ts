import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 12);

    const user = this.usersRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['projects'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['projects'],
    });
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    currentUser: User,
  ): Promise<User> {
    const user = await this.findOneById(id);

    // Solo superadmin puede actualizar usuarios o el usuario puede actualizarse a sí mismo
    if (currentUser.role !== UserRole.SUPERADMIN && currentUser.id !== id) {
      throw new BadRequestException('You can only update your own profile');
    }

    // Solo superadmin puede cambiar roles
    if (updateUserInput.role && currentUser.role !== UserRole.SUPERADMIN) {
      throw new BadRequestException('Only superadmin can change user roles');
    }

    // Hash password if provided
    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        12,
      );
    }

    Object.assign(user, updateUserInput);
    return this.usersRepository.save(user);
  }

  async remove(id: string, currentUser: User): Promise<boolean> {
    if (currentUser.role !== UserRole.SUPERADMIN) {
      throw new BadRequestException('Only superadmin can delete users');
    }

    if (currentUser.id === id) {
      throw new BadRequestException('You cannot delete your own account');
    }

    const user = await this.findOneById(id);
    await this.usersRepository.remove(user);
    return true;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
