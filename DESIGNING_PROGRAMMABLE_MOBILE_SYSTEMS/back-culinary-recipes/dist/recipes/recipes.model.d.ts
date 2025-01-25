import { Model } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Category } from 'src/categories';
interface RecipeCreationAttrs {
    title: string;
    cookingTime: number;
    calories: number;
    ingredients: string;
    instructions: string;
    categoryId: number;
    authorId: number;
    isPublished?: boolean;
}
export declare class Recipe extends Model<Recipe, RecipeCreationAttrs> {
    id: number;
    title: string;
    shortDescription: string;
    cookingTime: number;
    calories: number;
    image: string;
    ingredients: string;
    instructions: string;
    isPublished: boolean;
    categoryId: number;
    category: Category;
    authorId: number;
    author: User;
}
export {};
