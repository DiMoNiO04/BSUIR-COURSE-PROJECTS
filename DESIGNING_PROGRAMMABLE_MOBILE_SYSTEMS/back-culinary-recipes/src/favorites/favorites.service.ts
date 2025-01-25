import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './favorites.model';
import { Recipe } from 'src/recipes';
import { User } from 'src/users';
import { Category } from 'src/categories';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite) private favoriteRepository: typeof Favorite,
    @InjectModel(Recipe) private recipeRepository: typeof Recipe,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  private async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private async validateRecipe(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findByPk(recipeId);
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async getFavoriteRecipes(userId: number): Promise<{ message: string; data: Recipe[] }> {
    await this.validateUser(userId);

    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: Recipe,
          attributes: [
            'id',
            'title',
            'shortDescription',
            'cookingTime',
            'calories',
            'image',
            'ingredients',
            'instructions',
            'createdAt',
          ],
          include: [{ model: Category, attributes: ['id', 'name', 'description', 'image'] }],
        },
      ],
    });

    const message = favorites.length > 0 ? 'Favorite recipes retrieved successfully' : 'No favorite recipes found';

    return {
      message,
      data: favorites.map((favorite) => favorite.recipe),
    };
  }

  async addFavoriteRecipe(userId: number, recipeId: number): Promise<{ message: string }> {
    await this.validateUser(userId);
    await this.validateRecipe(recipeId);

    await Favorite.findOrCreate({
      where: { userId, recipeId },
    });

    return { message: 'Recipe added to favorites successfully' };
  }

  async removeFavoriteRecipe(userId: number, recipeId: number): Promise<{ message: string }> {
    await this.validateUser(userId);
    await this.validateRecipe(recipeId);

    await Favorite.destroy({
      where: { userId, recipeId },
    });

    return { message: 'Recipe removed from favorites successfully' };
  }

  async removeAllFavorites(userId: number): Promise<{ message: string }> {
    await this.validateUser(userId);

    await Favorite.destroy({
      where: { userId },
    });

    return { message: 'All favorite recipes removed successfully' };
  }
}
