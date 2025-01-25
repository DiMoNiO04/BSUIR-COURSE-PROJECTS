import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards, Req, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from '.';
import { Roles } from 'src/roles';
import { JwtAuthGuard, RolesGuard } from 'src/guards';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private recipesService: RecipesService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromRequest(request: Request): number {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    return user['id'];
  }

  @ApiOperation({ summary: 'Create recipe' })
  @ApiResponse({ status: 201 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/create')
  async create(@Body() createRecipeDto: CreateRecipeDto, @Req() request: Request) {
    const authorId = this.getUserIdFromRequest(request);
    return await this.recipesService.createRecipe(createRecipeDto, authorId);
  }

  @ApiOperation({ summary: 'Get all recipes' })
  @ApiResponse({ status: 200 })
  @Get('/getAll')
  getAll() {
    return this.recipesService.getAllRecipes();
  }

  @ApiOperation({ summary: 'Get all published recipes' })
  @ApiResponse({ status: 200 })
  @Get('/getPublished')
  getPublished() {
    return this.recipesService.getPublishedRecipes();
  }

  @ApiOperation({ summary: 'Get published recipes by category name' })
  @ApiResponse({ status: 200 })
  @Get('/getPublishedRecipesByCategory/:categoryName')
  async getPublishedByCategory(@Param('categoryName') categoryName: string) {
    return await this.recipesService.getPublishedRecipesByCategoryName(categoryName);
  }

  @ApiOperation({ summary: 'Get recipe by ID' })
  @ApiResponse({ status: 200 })
  @Get('/getOne/:id')
  getById(@Param('id') id: number) {
    return this.recipesService.getRecipeById(id);
  }

  @ApiOperation({ summary: 'Get recipes by user ID' })
  @ApiResponse({ status: 200 })
  @Roles('MODERATOR')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/user/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.recipesService.getRecipesByUserId(userId);
  }

  @ApiOperation({ summary: 'Search recipes' })
  @ApiResponse({ status: 200 })
  @Get('/search')
  async search(@Query('title') title?: string) {
    return await this.recipesService.searchRecipes(title);
  }

  @ApiOperation({ summary: 'Get all recipes for the authenticated user' })
  @ApiResponse({ status: 200 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/myRecipes')
  async getMyRecipes(@Req() request: Request) {
    const authorId = this.getUserIdFromRequest(request);
    return await this.recipesService.getRecipesByUserId(authorId);
  }

  @ApiOperation({ summary: 'Update recipe by ID' })
  @ApiResponse({ status: 200 })
  @Roles('USER')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto, @Req() request: Request) {
    const authorId = this.getUserIdFromRequest(request);
    return await this.recipesService.updateRecipe(id, { ...updateRecipeDto, authorId });
  }

  @ApiOperation({ summary: 'Toggle publish state of recipe by ID' })
  @ApiResponse({ status: 200 })
  @Roles('MODERATOR')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch('/toggle-publish/:id')
  async togglePublish(@Param('id') id: number) {
    return await this.recipesService.togglePublishRecipe(id);
  }

  @ApiOperation({ summary: 'Delete recipe by ID' })
  @ApiResponse({ status: 204 })
  @Roles('USER', 'MODERATOR')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Req() request: Request) {
    const authorId = this.getUserIdFromRequest(request);
    return await this.recipesService.deleteRecipe(id, authorId);
  }
}
