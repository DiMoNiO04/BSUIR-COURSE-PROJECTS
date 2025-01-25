import { Favorite } from './favorites.model';
import { Recipe } from 'src/recipes';
import { User } from 'src/users';
export declare class FavoritesService {
    private favoriteRepository;
    private recipeRepository;
    private userRepository;
    constructor(favoriteRepository: typeof Favorite, recipeRepository: typeof Recipe, userRepository: typeof User);
    private validateUser;
    private validateRecipe;
    getFavoriteRecipes(userId: number): Promise<{
        message: string;
        data: Recipe[];
    }>;
    addFavoriteRecipe(userId: number, recipeId: number): Promise<{
        message: string;
    }>;
    removeFavoriteRecipe(userId: number, recipeId: number): Promise<{
        message: string;
    }>;
    removeAllFavorites(userId: number): Promise<{
        message: string;
    }>;
}
