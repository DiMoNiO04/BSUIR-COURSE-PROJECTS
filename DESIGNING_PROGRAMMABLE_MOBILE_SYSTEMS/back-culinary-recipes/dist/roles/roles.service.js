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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../users/users.model");
const roles_model_1 = require("./roles.model");
const _1 = require(".");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(dto) {
        const role = await this.roleRepository.create(dto);
        return { message: 'Role successfully created', role };
    }
    async getRoleByValue(value) {
        const role = await this.roleRepository.findOne({ where: { value } });
        if (!role) {
            return { message: 'Role not found' };
        }
        return { message: 'Role successfully retrieved', data: role };
    }
    async updateRole(id, dto) {
        const role = await this.roleRepository.findByPk(id);
        if (!role) {
            return { message: 'Role not found' };
        }
        await role.update(dto);
        return { message: 'Role successfully updated', data: role };
    }
    async getAllRoles() {
        const roles = await this.roleRepository.findAll();
        return { message: 'Roles successfully retrieved', data: roles };
    }
    async getUsersByRole(roleValue) {
        const role = await this.roleRepository.findOne({
            where: { value: roleValue },
            include: [users_model_1.User],
        });
        if (!role) {
            return { message: 'Role not found' };
        }
        return { message: 'Users with specified role retrieved', data: role.users };
    }
    async changeUserRole(userId, newRoleId) {
        const roleExists = await roles_model_1.Role.findByPk(newRoleId);
        if (!roleExists) {
            return { message: 'Role not found' };
        }
        const userRole = await _1.UserRoles.findOne({ where: { userId } });
        if (!userRole) {
            return { message: 'User role not found' };
        }
        await userRole.update({ roleId: newRoleId });
        return { message: 'User role successfully updated', data: userRole };
    }
    async deleteRole(id) {
        const role = await this.roleRepository.findByPk(id);
        if (!role) {
            return { message: 'Role not found' };
        }
        await role.destroy();
        return { message: 'Role successfully deleted' };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(roles_model_1.Role)),
    __metadata("design:paramtypes", [Object])
], RolesService);
//# sourceMappingURL=roles.service.js.map