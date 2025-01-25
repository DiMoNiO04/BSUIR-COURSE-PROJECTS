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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const roles_service_1 = require("./roles.service");
const _1 = require(".");
const guards_1 = require("../guards");
let RolesController = class RolesController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    create(dto) {
        return this.roleService.createRole(dto);
    }
    getAllRoles() {
        return this.roleService.getAllRoles();
    }
    getRole(value) {
        return this.roleService.getRoleByValue(value);
    }
    getUsersByRole(roleValue) {
        return this.roleService.getUsersByRole(roleValue);
    }
    updateRole(id, dto) {
        return this.roleService.updateRole(id, dto);
    }
    changeUserRole(changeUserRoleDto) {
        return this.roleService.changeUserRole(changeUserRoleDto.userId, changeUserRoleDto.newRoleId);
    }
    deleteRole(id) {
        return this.roleService.deleteRole(id);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creating a role' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: _1.Role }),
    (0, _1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting all roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [_1.Role] }),
    (0, _1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getAllRoles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting role' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [_1.Role] }),
    (0, _1.Roles)('ADMIN', 'MODERATOR'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Get)('/getRole/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting users by role value' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_model_1.User] }),
    (0, _1.Roles)('ADMIN', 'MODERATOR'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Get)('/users/:roleValue'),
    __param(0, (0, common_1.Param)('roleValue')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getUsersByRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Updating a role by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: _1.Role }),
    (0, _1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, _1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "updateRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Changing role of a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User role successfully updated' }),
    (0, _1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Patch)('/assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.ChangeUserRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "changeUserRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleting a role by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Role successfully deleted' }),
    (0, _1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(guards_1.RolesGuard, guards_1.JwtAuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "deleteRole", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('User Roles'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map