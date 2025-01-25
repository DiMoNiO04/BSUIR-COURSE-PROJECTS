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
exports.BannedUsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const banned_users_model_1 = require("./banned-users.model");
const users_model_1 = require("../users/users.model");
const users_1 = require("../users");
let BannedUsersService = class BannedUsersService {
    constructor(bannedUsersRepository, userRepository, userService) {
        this.bannedUsersRepository = bannedUsersRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async banUser(requesterId, userId, reason) {
        if (requesterId === userId) {
            return { message: 'You cannot ban yourself!' };
        }
        const user = await this.userRepository.findByPk(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const alreadyBanned = await this.bannedUsersRepository.findOne({ where: { userId } });
        if (alreadyBanned) {
            return { message: 'User is already banned!' };
        }
        const bannedUser = await this.bannedUsersRepository.create({
            reason,
            email: user.email,
            userId,
        });
        await this.userRepository.update({ bannedId: bannedUser.id }, { where: { id: userId } });
        return { message: 'User banned successfully!' };
    }
    async unbanUser(userId) {
        const user = await this.userRepository.findByPk(userId);
        if (user && user.bannedId) {
            await this.bannedUsersRepository.destroy({ where: { id: user.bannedId } });
            await this.userRepository.update({ bannedId: null }, { where: { id: userId } });
            return { message: 'User unbanned successfully!' };
        }
        return { message: 'User not found or was not banned!' };
    }
    async isUserBanned(email) {
        const bannedUser = await this.bannedUsersRepository.findOne({ where: { email } });
        return !!bannedUser;
    }
};
exports.BannedUsersService = BannedUsersService;
exports.BannedUsersService = BannedUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(banned_users_model_1.BannedUsers)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, Object, users_1.UsersService])
], BannedUsersService);
//# sourceMappingURL=banned-users.service.js.map