import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async seed() {
    this.logger.log('Starting database seeding...');

    // Check if data already exists
    const userCount = await this.usersRepository.count();
    if (userCount > 0) {
      this.logger.log('Database already seeded');
      return;
    }

    // Create Superadmin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const superadmin = this.usersRepository.create({
      email: 'admin@example.com',
      firstName: 'Super',
      lastName: 'Admin',
      password: hashedPassword,
      role: UserRole.SUPERADMIN,
      isActive: true,
    });
    const savedSuperadmin = await this.usersRepository.save(superadmin);

    // Create Regular User
    const userPassword = await bcrypt.hash('user123', 12);
    const regularUser = this.usersRepository.create({
      email: 'user@example.com',
      firstName: 'Regular',
      lastName: 'User',
      password: userPassword,
      role: UserRole.USER,
      isActive: true,
    });
    const savedUser = await this.usersRepository.save(regularUser);

    // Create Sample Projects
    const projects = [
      {
        name: 'E-commerce Platform',
        description:
          'Building a modern e-commerce platform with React and Node.js',
        status: 'active',
        ownerId: savedSuperadmin.id,
      },
      {
        name: 'Mobile App Development',
        description: 'Developing a cross-platform mobile application',
        status: 'in-progress',
        ownerId: savedUser.id,
      },
      {
        name: 'Data Analytics Dashboard',
        description:
          'Creating a comprehensive analytics dashboard for business intelligence',
        status: 'completed',
        ownerId: savedSuperadmin.id,
      },
      {
        name: 'Personal Portfolio',
        description:
          'Building a personal portfolio website to showcase projects',
        status: 'active',
        ownerId: savedUser.id,
      },
    ];

    for (const projectData of projects) {
      const project = this.projectsRepository.create(projectData);
      await this.projectsRepository.save(project);
    }

    this.logger.log('Database seeding completed successfully!');
    this.logger.log('Superadmin credentials: admin@example.com / admin123');
    this.logger.log('Regular user credentials: user@example.com / user123');
  }
}
