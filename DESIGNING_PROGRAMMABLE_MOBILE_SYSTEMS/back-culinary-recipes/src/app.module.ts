import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users';
import { Role, RolesModule, UserRoles } from './roles';
import { AuthModule } from './auth';
import { CategoriesModule, Category } from './categories';
import { Recipe, RecipesModule } from './recipes';
import { Favorite, FavoritesModule } from './favorites';
import { BannedUsers, BannedUsersModule } from './bannedUsers';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, BannedUsers, Category, Recipe, Favorite],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    BannedUsersModule,
    AuthModule,
    CategoriesModule,
    RecipesModule,
    FavoritesModule,
  ],
})
export class AppModule {}
