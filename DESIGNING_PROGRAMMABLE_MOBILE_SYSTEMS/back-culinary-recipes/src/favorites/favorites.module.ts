import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from 'src/recipes';
import { UsersModule } from 'src/users';
import { Favorite, FavoritesController } from '.';
import { FavoritesService } from './favorites.service';
import { AuthModule } from 'src/auth';

@Module({
  imports: [SequelizeModule.forFeature([Favorite, Recipe]), AuthModule, UsersModule, JwtModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
