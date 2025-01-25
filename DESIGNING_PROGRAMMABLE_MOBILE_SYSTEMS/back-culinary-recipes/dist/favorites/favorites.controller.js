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
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const favorites_service_1 = require("./favorites.service");
const roles_1 = require("../roles");
const guards_1 = require("../guards");
let FavoritesController = class FavoritesController {
    constructor(favoritesService, jwtService) {
        this.favoritesService = favoritesService;
        this.jwtService = jwtService;
    }
    getUserIdFromRequest(request) {
        const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
        const user = this.jwtService.decode(token);
        return user['id'];
    }
    async addFavorite(recipeId, request) {
        const userId = this.getUserIdFromRequest(request);
        return await this.favoritesService.addFavoriteRecipe(userId, recipeId);
    }
    async getFavorites(request) {
        const userId = this.getUserIdFromRequest(request);
        return await this.favoritesService.getFavoriteRecipes(userId);
    }
    async removeFavorite(recipeId, request) {
        const userId = this.getUserIdFromRequest(request);
        return await this.favoritesService.removeFavoriteRecipe(userId, recipeId);
    }
    async removeAllFavorites(request) {
        const userId = this.getUserIdFromRequest(request);
        return await this.favoritesService.removeAllFavorites(userId);
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add recipe to favorites' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Post)('/add/:recipeId'),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "addFavorite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get favorite recipes' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove recipe from favorites' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Delete)('/remove/:recipeId'),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "removeFavorite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove all favorite recipes' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, roles_1.Roles)('USER'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Delete)('/remove-all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "removeAllFavorites", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, swagger_1.ApiTags)('Favorites'),
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService,
        jwt_1.JwtService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map