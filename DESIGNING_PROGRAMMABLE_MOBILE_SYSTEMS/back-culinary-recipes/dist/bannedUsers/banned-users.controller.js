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
exports.BannedUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const banned_users_service_1 = require("./banned-users.service");
const _1 = require(".");
const roles_1 = require("../roles");
const guards_1 = require("../guards");
let BannedUsersController = class BannedUsersController {
    constructor(bannedUsersService) {
        this.bannedUsersService = bannedUsersService;
    }
    async banUser(req, banUserDto) {
        const { userId, reason } = banUserDto;
        const requesterId = req.user.id;
        return await this.bannedUsersService.banUser(requesterId, userId, reason);
    }
    async unbanUser(userId) {
        return await this.bannedUsersService.unbanUser(userId);
    }
};
exports.BannedUsersController = BannedUsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ban a user' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Post)('/ban'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _1.UsersBannedDto]),
    __metadata("design:returntype", Promise)
], BannedUsersController.prototype, "banUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Unban a user' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Post)('/unban/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BannedUsersController.prototype, "unbanUser", null);
exports.BannedUsersController = BannedUsersController = __decorate([
    (0, swagger_1.ApiTags)('Banned Users'),
    (0, common_1.Controller)('banned-users'),
    __metadata("design:paramtypes", [banned_users_service_1.BannedUsersService])
], BannedUsersController);
//# sourceMappingURL=banned-users.controller.js.map