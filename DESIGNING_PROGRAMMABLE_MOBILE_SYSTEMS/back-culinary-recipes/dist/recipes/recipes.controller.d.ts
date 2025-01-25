import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from '.';
export declare class RecipesController {
    private recipesService;
    private jwtService;
    constructor(recipesService: RecipesService, jwtService: JwtService);
    private getUserIdFromRequest;
    create(createRecipeDto: CreateRecipeDto, request: Request): Promise<{
        message: string;
        data: import("./recipes.model").Recipe;
    }>;
    getAll(): Promise<{
        message: string;
        data: import("./recipes.model").Recipe[];
    }>;
    getPublished(): Promise<{
        message: string;
        data: import("./recipes.model").Recipe[];
    }>;
    getPublishedByCategory(categoryName: string): Promise<{
        message: string;
        data: import("./recipes.model").Recipe[];
    }>;
    getById(id: number): Promise<{
        message: string;
        data: import("./recipes.model").Recipe;
    }>;
    getByUserId(userId: number): Promise<{
        message: string;
        data: import("./recipes.model").Recipe[];
    }>;
    search(title?: string): Promise<{
        message: string;
        data: import("./recipes.model").Recipe[];
    }>;
    getMyRecipes(request: Request): Promise<{
        message: string;
        data: import("./recipes.model").Recipe[];
    }>;
    update(id: number, updateRecipeDto: UpdateRecipeDto, request: Request): Promise<{
        message: string;
        data: import("./recipes.model").Recipe;
    }>;
    togglePublish(id: number): Promise<{
        message: string;
        data: import("./recipes.model").Recipe;
    }>;
    remove(id: number, request: Request): Promise<{
        message: string;
    }>;
}
