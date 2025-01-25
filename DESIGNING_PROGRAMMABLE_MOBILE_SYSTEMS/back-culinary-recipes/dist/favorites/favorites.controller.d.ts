import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoritesService;
    private jwtService;
    constructor(favoritesService: FavoritesService, jwtService: JwtService);
    private getUserIdFromRequest;
    addFavorite(recipeId: number, request: Request): Promise<{
        message: string;
    }>;
    getFavorites(request: Request): Promise<{
        message: string;
        data: import("../recipes").Recipe[];
    }>;
    removeFavorite(recipeId: number, request: Request): Promise<{
        message: string;
    }>;
    removeAllFavorites(request: Request): Promise<{
        message: string;
    }>;
}
