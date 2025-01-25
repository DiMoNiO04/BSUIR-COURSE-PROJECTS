"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const recipes_1 = require("../recipes");
const users_1 = require("../users");
const _1 = require(".");
const favorites_service_1 = require("./favorites.service");
const auth_1 = require("../auth");
let FavoritesModule = class FavoritesModule {
};
exports.FavoritesModule = FavoritesModule;
exports.FavoritesModule = FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([_1.Favorite, recipes_1.Recipe]), auth_1.AuthModule, users_1.UsersModule, jwt_1.JwtModule],
        controllers: [_1.FavoritesController],
        providers: [favorites_service_1.FavoritesService],
    })
], FavoritesModule);
//# sourceMappingURL=favorites.module.js.map