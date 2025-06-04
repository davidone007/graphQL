import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './common/seed.service';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // GraphQL Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      context: ({ req }) => ({ req }),
    }),

    // Database Configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = process.env.NODE_ENV === 'production';

        if (isProd) {
          return {
            type: 'postgres',
            url: configService.get('DATABASE_URL'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            ssl: {
              rejectUnauthorized: false, // Necesario para algunas plataformas cloud
            },
            logging: true,
          };
        }

        return {
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Solo para desarrollo
          dropSchema: true, // Borra la base de datos en cada inicio
          logging: true,
        };
      },
    }),

    // JWT Global Configuration
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '24h' },
    }),

    // TypeORM for Seeder
    TypeOrmModule.forFeature([User, Project]),

    // Feature Modules
    AuthModule,
    UsersModule,
    ProjectsModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
