"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const roles_module_1 = require("../roles/roles.module");
const roles_1 = require("../roles");
const users_1 = require("./");
const auth_1 = require("../auth");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [users_1.UsersService],
        controllers: [users_1.UsersController],
        imports: [sequelize_1.SequelizeModule.forFeature([users_1.User, roles_1.Role, roles_1.UserRoles]), roles_module_1.RolesModule, (0, common_1.forwardRef)(() => auth_1.AuthModule), jwt_1.JwtModule],
        exports: [users_1.UsersService, sequelize_1.SequelizeModule],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map