import { Op } from 'sequelize';
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipes.model';
import { CreateRecipeDto, UpdateRecipeDto } from '.';
import { Category } from 'src/categories';
import { User } from 'src/users';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe) private recipeRepository: typeof Recipe,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  private validateBase64Image(image: string): boolean {
    return /^data:image\/\w+;base64,/.test(image);
  }

  private async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private async validateRecipe(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findByPk(id, {
      include: [
        { model: Category, attributes: ['id', 'name', 'description', 'image'] },
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
    });
    if (!recipe) throw new NotFoundException(`Recipe with id ${id} not found`);
    return recipe;
  }

  async createRecipe(dto: CreateRecipeDto, authorId: number): Promise<{ message: string; data: Recipe }> {
    await this.validateUser(authorId);

    if (dto.image && !this.validateBase64Image(dto.image)) {
      throw new HttpException('Invalid image format', HttpStatus.BAD_REQUEST);
    }

    const recipe = await this.recipeRepository.create({ ...dto, isPublished: false });
    await recipe.$set('author', authorId);
    return { message: 'Recipe created successfully. It is currently under moderation', data: recipe };
  }

  async getAllRecipes(): Promise<{ message: string; data: Recipe[] }> {
    const recipes = await this.recipeRepository.findAll({
      include: [
        { model: Category, attributes: ['id', 'name', 'description', 'image'] },
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
    });
    return { message: 'All recipes retrieved successfully', data: recipes };
  }

  async getPublishedRecipes(): Promise<{ message: string; data: Recipe[] }> {
    const recipes = await this.recipeRepository.findAll({
      where: { isPublished: true },
      include: [
        { model: Category, attributes: ['id', 'name', 'description', 'image'] },
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
    });
    return { message: 'All published recipes retrieved successfully', data: recipes };
  }

  async getPublishedRecipesByCategoryName(categoryName: string): Promise<{ message: string; data: Recipe[] }> {
    const recipes = await this.recipeRepository.findAll({
      where: { isPublished: true },
      include: [
        {
          model: Category,
          where: { name: { [Op.iLike]: categoryName } },
          attributes: ['id', 'name', 'description', 'image'],
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    let message: string = `Published recipes for category '${categoryName}' retrieved successfully`;
    if (recipes.length === 0) {
      message = `No published recipes found for category`;
    }

    return { message: message, data: recipes };
  }

  async getRecipeById(id: number): Promise<{ message: string; data: Recipe }> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      include: [
        { model: Category, attributes: ['id', 'name', 'description', 'image'] },
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
    });

    if (!recipe) throw new NotFoundException(`Published recipe with id ${id} not found`);

    return { message: `Published recipe with id ${id} retrieved successfully`, data: recipe };
  }

  async getRecipesByUserId(userId: number): Promise<{ message: string; data: Recipe[] }> {
    await this.validateUser(userId);
    const recipes = await this.recipeRepository.findAll({
      where: { authorId: userId },
      include: [
        { model: Category, attributes: ['id', 'name', 'description', 'image'] },
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
    });
    return { message: `Recipes for user with id ${userId} retrieved successfully`, data: recipes };
  }

  async updateRecipe(id: number, dto: UpdateRecipeDto): Promise<{ message: string; data: Recipe }> {
    const recipe = await this.validateRecipe(id);

    if (recipe.authorId !== dto.authorId) {
      throw new UnauthorizedException('You can only update your own recipes');
    }

    if (dto.image && !this.validateBase64Image(dto.image)) {
      throw new HttpException('Invalid image format', HttpStatus.BAD_REQUEST);
    }

    recipe.isPublished = false;
    Object.assign(recipe, dto);
    await recipe.save();

    return { message: `Recipe updated successfully`, data: recipe };
  }

  async deleteRecipe(id: number, authorId: number): Promise<{ message: string }> {
    const recipe = await this.validateRecipe(id);

    await recipe.destroy();
    return { message: `Recipe '${recipe.title}' deleted successfully` };
  }

  async togglePublishRecipe(id: number): Promise<{ message: string; data: Recipe }> {
    const recipe = await this.validateRecipe(id);
    recipe.isPublished = !recipe.isPublished;
    await recipe.save();
    const action = recipe.isPublished ? 'published' : 'unpublished';
    return { message: `Recipe ${recipe.title} ${action} successfully`, data: recipe };
  }

  async searchRecipes(title?: string): Promise<{ message: string; data: Recipe[] }> {
    const where: any = {};

    if (title) {
      where.title = {
        [Op.iLike]: `%${title}%`,
      };
    }

    const recipes = await this.recipeRepository.findAll({
      where,
      include: [
        { model: Category, attributes: ['id', 'name', 'description', 'image'] },
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
      ],
    });

    return { message: 'Recipes retrieved successfully', data: recipes };
  }
}
