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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const guards_1 = require("../guards");
const roles_1 = require("../roles");
const users_service_1 = require("./users.service");
const _1 = require(".");
let UsersController = class UsersController {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    getUserIdFromRequest(request) {
        const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
        const user = this.jwtService.decode(token);
        return user['id'];
    }
    async create(userDto) {
        const { message, user } = await this.usersService.createUser(userDto);
        return { message, data: user };
    }
    async getAll() {
        const { message, users } = await this.usersService.getAllUsers();
        return { message, data: users };
    }
    async getPersonalData(request) {
        const userId = this.getUserIdFromRequest(request);
        const { message, user } = await this.usersService.getUserById(userId);
        return {
            message,
            data: user,
        };
    }
    async changePassword(request, changePasswordDto) {
        const userId = this.getUserIdFromRequest(request);
        const { message } = await this.usersService.changePassword(userId, changePasswordDto);
        return { message };
    }
    async updateNameAndSurname(request, updateUserDto) {
        const userId = this.getUserIdFromRequest(request);
        const { message } = await this.usersService.updateProfile(userId, updateUserDto);
        return { message };
    }
    async deleteSelf(request) {
        const userId = this.getUserIdFromRequest(request);
        const { message } = await this.usersService.deleteUser(userId);
        return { message };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a user' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: _1.User }),
    (0, roles_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [_1.User] }),
    (0, roles_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get personal user data' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: _1.User }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Get)('/self/personal-data'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPersonalData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Change user password' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Patch)('/self/change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update profile' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Patch)('/self/update-profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateNameAndSurname", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete your own account' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Delete)('/self/delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteSelf", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map