import { Model } from 'sequelize-typescript';
import { Recipe } from 'src/recipes';
export declare class Favorite extends Model<Favorite> {
    userId: number;
    recipeId: number;
    recipe: Recipe;
}
