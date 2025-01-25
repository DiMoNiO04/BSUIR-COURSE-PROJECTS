import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';
import { UserRoles, UpdateRoleDto, CreateRoleDto } from '.';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return { message: 'Role successfully created', role };
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      return { message: 'Role not found' };
    }
    return { message: 'Role successfully retrieved', data: role };
  }

  async updateRole(id: number, dto: UpdateRoleDto) {
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

  async getUsersByRole(roleValue: string) {
    const role = await this.roleRepository.findOne({
      where: { value: roleValue },
      include: [User],
    });
    if (!role) {
      return { message: 'Role not found' };
    }
    return { message: 'Users with specified role retrieved', data: role.users };
  }

  async changeUserRole(userId: number, newRoleId: number) {
    const roleExists = await Role.findByPk(newRoleId);
    if (!roleExists) {
      return { message: 'Role not found' };
    }

    const userRole = await UserRoles.findOne({ where: { userId } });
    if (!userRole) {
      return { message: 'User role not found' };
    }

    await userRole.update({ roleId: newRoleId });
    return { message: 'User role successfully updated', data: userRole };
  }

  async deleteRole(id: number) {
    const role = await this.roleRepository.findByPk(id);
    if (!role) {
      return { message: 'Role not found' };
    }
    await role.destroy();
    return { message: 'Role successfully deleted' };
  }
}
