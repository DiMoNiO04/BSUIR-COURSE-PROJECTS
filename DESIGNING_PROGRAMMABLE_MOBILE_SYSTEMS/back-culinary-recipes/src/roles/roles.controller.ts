import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { RolesService } from './roles.service';
import { ChangeUserRoleDto, CreateRoleDto, Roles, Role } from '.';
import { JwtAuthGuard, RolesGuard } from 'src/guards';

@ApiTags('User Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Creating a role' })
  @ApiResponse({ status: 201, type: Role })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Getting all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/get')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Getting role' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('ADMIN', 'MODERATOR')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/getRole/:value')
  getRole(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Getting users by role value' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN', 'MODERATOR')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/users/:roleValue')
  getUsersByRole(@Param('roleValue') roleValue: string) {
    return this.roleService.getUsersByRole(roleValue);
  }

  @ApiOperation({ summary: 'Updating a role by ID' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch('/update/:id')
  updateRole(@Param('id') id: number, @Body() dto: CreateRoleDto) {
    return this.roleService.updateRole(id, dto);
  }

  @ApiOperation({ summary: 'Changing role of a user' })
  @ApiResponse({ status: 200, description: 'User role successfully updated' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch('/assign')
  changeUserRole(@Body() changeUserRoleDto: ChangeUserRoleDto) {
    return this.roleService.changeUserRole(changeUserRoleDto.userId, changeUserRoleDto.newRoleId);
  }

  @ApiOperation({ summary: 'Deleting a role by ID' })
  @ApiResponse({ status: 200, description: 'Role successfully deleted' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete('/delete/:id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
