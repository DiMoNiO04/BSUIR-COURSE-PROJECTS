import { Body, Controller, Delete, Get, Post, Req, UseGuards, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { Roles } from 'src/roles';
import { UsersService } from './users.service';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto, User } from '.';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromRequest(request: Request): number {
    const token = request.cookies?.Authentication || request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.decode(token);
    return user['id'];
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/create')
  async create(@Body() userDto: CreateUserDto) {
    const { message, user } = await this.usersService.createUser(userDto);
    return { message, data: user };
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/get')
  async getAll() {
    const { message, users } = await this.usersService.getAllUsers();
    return { message, data: users };
  }

  @ApiOperation({ summary: 'Get personal user data' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('/self/personal-data')
  async getPersonalData(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    const { message, user } = await this.usersService.getUserById(userId);

    return {
      message,
      data: user,
    };
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch('/self/change-password')
  async changePassword(@Req() request: Request, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = this.getUserIdFromRequest(request);
    const { message } = await this.usersService.changePassword(userId, changePasswordDto);
    return { message };
  }

  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch('/self/update-profile')
  async updateNameAndSurname(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = this.getUserIdFromRequest(request);
    const { message } = await this.usersService.updateProfile(userId, updateUserDto);
    return { message };
  }

  @ApiOperation({ summary: 'Delete your own account' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('/self/delete')
  async deleteSelf(@Req() request: Request) {
    const userId = this.getUserIdFromRequest(request);
    const { message } = await this.usersService.deleteUser(userId);
    return { message };
  }
}
