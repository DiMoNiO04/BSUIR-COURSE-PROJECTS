import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto, User } from '.';
export declare class UsersController {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private getUserIdFromRequest;
    create(userDto: CreateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    getAll(): Promise<{
        message: string;
        data: User[];
    }>;
    getPersonalData(request: Request): Promise<{
        message: string;
        data: User;
    }>;
    changePassword(request: Request, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    updateNameAndSurname(request: Request, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteSelf(request: Request): Promise<{
        message: string;
    }>;
}
