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
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const recipes_service_1 = require("./recipes.service");
const _1 = require(".");
const roles_1 = require("../roles");
const guards_1 = require("../guards");
let RecipesController = class RecipesController {
    constructor(recipesService, jwtService) {
        this.recipesService = recipesService;
        this.jwtService = jwtService;
    }
    getUserIdFromRequest(request) {
        const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
        const user = this.jwtService.decode(token);
        return user['id'];
    }
    async create(createRecipeDto, request) {
        const authorId = this.getUserIdFromRequest(request);
        return await this.recipesService.createRecipe(createRecipeDto, authorId);
    }
    getAll() {
        return this.recipesService.getAllRecipes();
    }
    getPublished() {
        return this.recipesService.getPublishedRecipes();
    }
    async getPublishedByCategory(categoryName) {
        return await this.recipesService.getPublishedRecipesByCategoryName(categoryName);
    }
    getById(id) {
        return this.recipesService.getRecipeById(id);
    }
    getByUserId(userId) {
        return this.recipesService.getRecipesByUserId(userId);
    }
    async search(title) {
        return await this.recipesService.searchRecipes(title);
    }
    async getMyRecipes(request) {
        const authorId = this.getUserIdFromRequest(request);
        return await this.recipesService.getRecipesByUserId(authorId);
    }
    async update(id, updateRecipeDto, request) {
        const authorId = this.getUserIdFromRequest(request);
        return await this.recipesService.updateRecipe(id, { ...updateRecipeDto, authorId });
    }
    async togglePublish(id) {
        return await this.recipesService.togglePublishRecipe(id);
    }
    async remove(id, request) {
        const authorId = this.getUserIdFromRequest(request);
        return await this.recipesService.deleteRecipe(id, authorId);
    }
};
exports.RecipesController = RecipesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create recipe' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.CreateRecipeDto, Object]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all recipes' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all published recipes' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('/getPublished'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "getPublished", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get published recipes by category name' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('/getPublishedRecipesByCategory/:categoryName'),
    __param(0, (0, common_1.Param)('categoryName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getPublishedByCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get recipe by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('/getOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get recipes by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('MODERATOR'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "getByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search recipes' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all recipes for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Get)('/myRecipes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "getMyRecipes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update recipe by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, _1.UpdateRecipeDto, Object]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Toggle publish state of recipe by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('MODERATOR'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Patch)('/toggle-publish/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "togglePublish", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete recipe by ID' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, roles_1.Roles)('USER', 'MODERATOR'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "remove", null);
exports.RecipesController = RecipesController = __decorate([
    (0, swagger_1.ApiTags)('Recipes'),
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService,
        jwt_1.JwtService])
], RecipesController);
//# sourceMappingURL=recipes.controller.js.map