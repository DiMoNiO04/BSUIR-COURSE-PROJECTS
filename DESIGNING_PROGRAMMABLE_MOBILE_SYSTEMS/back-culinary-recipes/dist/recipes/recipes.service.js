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
exports.RecipesService = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
const sequelize_2 = require("@nestjs/sequelize");
const recipes_model_1 = require("./recipes.model");
const categories_1 = require("../categories");
const users_1 = require("../users");
let RecipesService = class RecipesService {
    constructor(recipeRepository, userRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }
    validateBase64Image(image) {
        return /^data:image\/\w+;base64,/.test(image);
    }
    async validateUser(userId) {
        const user = await this.userRepository.findByPk(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async validateRecipe(id) {
        const recipe = await this.recipeRepository.findByPk(id, {
            include: [
                { model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] },
                { model: users_1.User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            ],
        });
        if (!recipe)
            throw new common_1.NotFoundException(`Recipe with id ${id} not found`);
        return recipe;
    }
    async createRecipe(dto, authorId) {
        await this.validateUser(authorId);
        if (dto.image && !this.validateBase64Image(dto.image)) {
            throw new common_1.HttpException('Invalid image format', common_1.HttpStatus.BAD_REQUEST);
        }
        const recipe = await this.recipeRepository.create({ ...dto, isPublished: false });
        await recipe.$set('author', authorId);
        return { message: 'Recipe created successfully. It is currently under moderation', data: recipe };
    }
    async getAllRecipes() {
        const recipes = await this.recipeRepository.findAll({
            include: [
                { model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] },
                { model: users_1.User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            ],
        });
        return { message: 'All recipes retrieved successfully', data: recipes };
    }
    async getPublishedRecipes() {
        const recipes = await this.recipeRepository.findAll({
            where: { isPublished: true },
            include: [
                { model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] },
                { model: users_1.User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            ],
        });
        return { message: 'All published recipes retrieved successfully', data: recipes };
    }
    async getPublishedRecipesByCategoryName(categoryName) {
        const recipes = await this.recipeRepository.findAll({
            where: { isPublished: true },
            include: [
                {
                    model: categories_1.Category,
                    where: { name: { [sequelize_1.Op.iLike]: categoryName } },
                    attributes: ['id', 'name', 'description', 'image'],
                },
                {
                    model: users_1.User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
            ],
        });
        let message = `Published recipes for category '${categoryName}' retrieved successfully`;
        if (recipes.length === 0) {
            message = `No published recipes found for category`;
        }
        return { message: message, data: recipes };
    }
    async getRecipeById(id) {
        const recipe = await this.recipeRepository.findOne({
            where: { id },
            include: [
                { model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] },
                { model: users_1.User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            ],
        });
        if (!recipe)
            throw new common_1.NotFoundException(`Published recipe with id ${id} not found`);
        return { message: `Published recipe with id ${id} retrieved successfully`, data: recipe };
    }
    async getRecipesByUserId(userId) {
        await this.validateUser(userId);
        const recipes = await this.recipeRepository.findAll({
            where: { authorId: userId },
            include: [
                { model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] },
                { model: users_1.User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            ],
        });
        return { message: `Recipes for user with id ${userId} retrieved successfully`, data: recipes };
    }
    async updateRecipe(id, dto) {
        const recipe = await this.validateRecipe(id);
        if (recipe.authorId !== dto.authorId) {
            throw new common_1.UnauthorizedException('You can only update your own recipes');
        }
        if (dto.image && !this.validateBase64Image(dto.image)) {
            throw new common_1.HttpException('Invalid image format', common_1.HttpStatus.BAD_REQUEST);
        }
        recipe.isPublished = false;
        Object.assign(recipe, dto);
        await recipe.save();
        return { message: `Recipe updated successfully`, data: recipe };
    }
    async deleteRecipe(id, authorId) {
        const recipe = await this.validateRecipe(id);
        await recipe.destroy();
        return { message: `Recipe '${recipe.title}' deleted successfully` };
    }
    async togglePublishRecipe(id) {
        const recipe = await this.validateRecipe(id);
        recipe.isPublished = !recipe.isPublished;
        await recipe.save();
        const action = recipe.isPublished ? 'published' : 'unpublished';
        return { message: `Recipe ${recipe.title} ${action} successfully`, data: recipe };
    }
    async searchRecipes(title) {
        const where = {};
        if (title) {
            where.title = {
                [sequelize_1.Op.iLike]: `%${title}%`,
            };
        }
        const recipes = await this.recipeRepository.findAll({
            where,
            include: [
                { model: categories_1.Category, attributes: ['id', 'name', 'description', 'image'] },
                { model: users_1.User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            ],
        });
        return { message: 'Recipes retrieved successfully', data: recipes };
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_2.InjectModel)(recipes_model_1.Recipe)),
    __param(1, (0, sequelize_2.InjectModel)(users_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map