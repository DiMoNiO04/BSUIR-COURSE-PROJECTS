import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { FavoritesService } from './favorites.service';
import { Roles } from 'src/roles';
import { JwtAuthGuard, RolesGuard } from 'src/guards';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromRequest(request: Request): number {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    return user['id'];
  }

  @ApiOperation({ summary: 'Add recipe to favorites' })
  @ApiResponse({ status: 201 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/add/:recipeId')
  async addFavorite(@Param('recipeId') recipeId: number, @Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.addFavoriteRecipe(userId, recipeId);
  }

  @ApiOperation({ summary: 'Get favorite recipes' })
  @ApiResponse({ status: 200 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/get')
  async getFavorites(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.getFavoriteRecipes(userId);
  }

  @ApiOperation({ summary: 'Remove recipe from favorites' })
  @ApiResponse({ status: 204 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete('/remove/:recipeId')
  async removeFavorite(@Param('recipeId') recipeId: number, @Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.removeFavoriteRecipe(userId, recipeId);
  }

  @ApiOperation({ summary: 'Remove all favorite recipes' })
  @ApiResponse({ status: 204 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete('/remove-all')
  async removeAllFavorites(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    return await this.favoritesService.removeAllFavorites(userId);
  }
}
