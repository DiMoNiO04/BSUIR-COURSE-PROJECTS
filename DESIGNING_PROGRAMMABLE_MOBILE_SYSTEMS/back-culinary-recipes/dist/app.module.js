"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const users_1 = require("./users");
const roles_1 = require("./roles");
const auth_1 = require("./auth");
const categories_1 = require("./categories");
const recipes_1 = require("./recipes");
const favorites_1 = require("./favorites");
const bannedUsers_1 = require("./bannedUsers");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [users_1.User, roles_1.Role, roles_1.UserRoles, bannedUsers_1.BannedUsers, categories_1.Category, recipes_1.Recipe, favorites_1.Favorite],
                autoLoadModels: true,
            }),
            users_module_1.UsersModule,
            roles_1.RolesModule,
            bannedUsers_1.BannedUsersModule,
            auth_1.AuthModule,
            categories_1.CategoriesModule,
            recipes_1.RecipesModule,
            favorites_1.FavoritesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map