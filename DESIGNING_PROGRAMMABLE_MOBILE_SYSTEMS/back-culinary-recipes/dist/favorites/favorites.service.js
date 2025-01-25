"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const favorites_model_1 = require("./favorites.model");
const recipes_1 = require("../recipes");
const users_1 = require("../users");
const categories_1 = require("../categories");
let FavoritesService = class FavoritesService {
    constructor(favoriteRepository, recipeRepository, userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }
    async validateUser(userId) {
        const user = await this.userRepository.findByPk(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async validateRecipe(recipeId) {
        const recipe = await this.recipeRepository.findByPk(recipeId);
        if (!recipe)
            throw new common_1.NotFoundException('Recipe not found');
        return recipe;
    }
    async getFavoriteRecipes(userId) {
        await this.validateUser(userId);
        const favorites = await favorites_model_1.Favorite.findAll({
            where: { userId },
            include: [
                {
                    model: recipes_1.Recipe,
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
                    include: [{ model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] }],
                },
            ],
        });
        const message = favorites.length > 0 ? 'Favorite recipes retrieved successfully' : 'No favorite recipes found';
        return {
            message,
            data: favorites.map((favorite) => favorite.recipe),
        };
    }
    async addFavoriteRecipe(userId, recipeId) {
        await this.validateUser(userId);
        await this.validateRecipe(recipeId);
        await favorites_model_1.Favorite.findOrCreate({
            where: { userId, recipeId },
        });
        return { message: 'Recipe added to favorites successfully' };
    }
    async removeFavoriteRecipe(userId, recipeId) {
        await this.validateUser(userId);
        await this.validateRecipe(recipeId);
        await favorites_model_1.Favorite.destroy({
            where: { userId, recipeId },
        });
        return { message: 'Recipe removed from favorites successfully' };
    }
    async removeAllFavorites(userId) {
        await this.validateUser(userId);
        await favorites_model_1.Favorite.destroy({
            where: { userId },
        });
        return { message: 'All favorite recipes removed successfully' };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(favorites_model_1.Favorite)),
    __param(1, (0, sequelize_1.InjectModel)(recipes_1.Recipe)),
    __param(2, (0, sequelize_1.InjectModel)(users_1.User)),
    __metadata("design:paramtypes", [Object, Object, Object])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map