"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannedUsersModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_model_1 = require("../users/users.model");
const banned_users_model_1 = require("./banned-users.model");
const banned_users_controller_1 = require("./banned-users.controller");
const banned_users_service_1 = require("./banned-users.service");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
let BannedUsersModule = class BannedUsersModule {
};
exports.BannedUsersModule = BannedUsersModule;
exports.BannedUsersModule = BannedUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([banned_users_model_1.BannedUsers, users_model_1.User]),
            (0, common_2.forwardRef)(() => users_module_1.UsersModule),
            (0, common_2.forwardRef)(() => auth_module_1.AuthModule),
            jwt_1.JwtModule,
        ],
        controllers: [banned_users_controller_1.BannedUsersController],
        providers: [banned_users_service_1.BannedUsersService],
        exports: [banned_users_service_1.BannedUsersService],
    })
], BannedUsersModule);
//# sourceMappingURL=banned-users.module.js.map