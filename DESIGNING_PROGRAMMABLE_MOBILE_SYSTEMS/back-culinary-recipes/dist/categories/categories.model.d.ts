import { Model } from 'sequelize-typescript';
import { Recipe } from 'src/recipes/recipes.model';
interface CategoryCreationAttrs {
    name: string;
    description: string;
    image: string;
}
export declare class Category extends Model<Category, CategoryCreationAttrs> {
    id: number;
    name: string;
    description: string;
    image: string;
    countrecipes: number;
    recipes: Recipe[];
}
export {};
