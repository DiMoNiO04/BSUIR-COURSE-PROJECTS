"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const recipes_service_1 = require("./recipes.service");
const _1 = require(".");
const categories_1 = require("../categories");
const users_1 = require("../users");
const favorites_1 = require("../favorites");
const auth_1 = require("../auth");
let RecipesModule = class RecipesModule {
};
exports.RecipesModule = RecipesModule;
exports.RecipesModule = RecipesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([_1.Recipe, categories_1.Category]), auth_1.AuthModule, users_1.UsersModule, jwt_1.JwtModule, favorites_1.FavoritesModule],
        controllers: [_1.RecipesController],
        providers: [recipes_service_1.RecipesService],
    })
], RecipesModule);
//# sourceMappingURL=recipes.module.js.map