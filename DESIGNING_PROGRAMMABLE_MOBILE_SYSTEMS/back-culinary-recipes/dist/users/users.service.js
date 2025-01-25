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
exports.UsersService = void 0;
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const recipes_model_1 = require("../recipes/recipes.model");
const categories_1 = require("../categories");
const roles_1 = require("../roles");
const bannedUsers_1 = require("../bannedUsers");
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    isSimilar(oldPassword, newPassword) {
        if (oldPassword === newPassword)
            return true;
        const similarityThreshold = 0.9;
        const longer = oldPassword.length > newPassword.length ? oldPassword : newPassword;
        const shorter = oldPassword.length > newPassword.length ? newPassword : oldPassword;
        return longer.includes(shorter);
    }
    async createUser(dto) {
        const user = await this.userRepository.create(dto);
        const { data } = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [data.id]);
        user.roles = [data];
        return { message: 'User created successfully!', user };
    }
    async getUserById(userId) {
        const user = await this.userRepository.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: roles_1.Role,
                    attributes: ['id', 'value', 'description'],
                    through: { attributes: [] },
                },
                {
                    model: recipes_model_1.Recipe,
                    attributes: [
                        'id',
                        'title',
                        'shortDescription',
                        'cookingTime',
                        'calories',
                        'image',
                        'ingredients',
                        'instructions',
                        'categoryId',
                        'createdAt',
                        'updatedAt',
                    ],
                    include: [
                        {
                            model: categories_1.Category,
                            attributes: ['id', 'name', 'description', 'image'],
                        },
                    ],
                },
            ],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return { message: 'User retrieved successfully!', user };
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({
            attributes: { exclude: ['password', 'updatedAt'] },
            include: [
                {
                    model: roles_1.Role,
                    attributes: ['value', 'description'],
                    through: { attributes: [] },
                },
                {
                    model: bannedUsers_1.BannedUsers,
                    attributes: ['email', 'reason'],
                },
                {
                    model: recipes_model_1.Recipe,
                    attributes: [
                        'id',
                        'title',
                        'shortDescription',
                        'cookingTime',
                        'calories',
                        'image',
                        'ingredients',
                        'instructions',
                        'categoryId',
                        'createdAt',
                        'updatedAt',
                    ],
                    include: [
                        {
                            model: categories_1.Category,
                            attributes: ['id', 'name', 'description', 'image'],
                        },
                    ],
                },
            ],
        });
        return { message: 'Users retrieved successfully!', users };
    }
    async getUsersByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return { message: user ? 'User found!' : 'User not found!', user };
    }
    async updateProfile(userId, updateUserDto) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (updateUserDto.firstName)
            user.firstName = updateUserDto.firstName;
        if (updateUserDto.lastName)
            user.lastName = updateUserDto.lastName;
        await user.save();
        return { message: 'User data updated successfully' };
    }
    async changePassword(userId, changePasswordDto) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isMatch = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Old password is incorrect');
        }
        if (this.isSimilar(changePasswordDto.currentPassword, changePasswordDto.newPassword)) {
            throw new common_1.UnauthorizedException('New password cannot be the same or similar to the old password');
        }
        user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
        await user.save();
        return { message: 'Password changed successfully' };
    }
    async deleteUser(id) {
        const user = await this.userRepository.findByPk(id);
        if (user) {
            await user.destroy();
            return { message: 'Account deleted!' };
        }
        return { message: 'Account not found, deletion failed!' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, roles_1.RolesService])
], UsersService);
//# sourceMappingURL=users.service.js.map