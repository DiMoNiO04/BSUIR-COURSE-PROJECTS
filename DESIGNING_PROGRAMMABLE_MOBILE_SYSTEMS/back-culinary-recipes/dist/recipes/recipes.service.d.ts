import { Recipe } from './recipes.model';
import { CreateRecipeDto, UpdateRecipeDto } from '.';
import { User } from 'src/users';
export declare class RecipesService {
    private recipeRepository;
    private userRepository;
    constructor(recipeRepository: typeof Recipe, userRepository: typeof User);
    private validateBase64Image;
    private validateUser;
    private validateRecipe;
    createRecipe(dto: CreateRecipeDto, authorId: number): Promise<{
        message: string;
        data: Recipe;
    }>;
    getAllRecipes(): Promise<{
        message: string;
        data: Recipe[];
    }>;
    getPublishedRecipes(): Promise<{
        message: string;
        data: Recipe[];
    }>;
    getPublishedRecipesByCategoryName(categoryName: string): Promise<{
        message: string;
        data: Recipe[];
    }>;
    getRecipeById(id: number): Promise<{
        message: string;
        data: Recipe;
    }>;
    getRecipesByUserId(userId: number): Promise<{
        message: string;
        data: Recipe[];
    }>;
    updateRecipe(id: number, dto: UpdateRecipeDto): Promise<{
        message: string;
        data: Recipe;
    }>;
    deleteRecipe(id: number, authorId: number): Promise<{
        message: string;
    }>;
    togglePublishRecipe(id: number): Promise<{
        message: string;
        data: Recipe;
    }>;
    searchRecipes(title?: string): Promise<{
        message: string;
        data: Recipe[];
    }>;
}
