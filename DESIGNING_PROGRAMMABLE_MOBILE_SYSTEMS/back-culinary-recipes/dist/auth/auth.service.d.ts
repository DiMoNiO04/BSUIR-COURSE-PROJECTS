import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, RegUserDto } from '.';
import { BannedUsersService } from 'src/bannedUsers';
import { UsersService } from 'src/users';
export declare class AuthService {
    private userService;
    private jwtService;
    private bannedUsersService;
    constructor(userService: UsersService, jwtService: JwtService, bannedUsersService: BannedUsersService);
    private generateToken;
    private validateUser;
    login(userDto: AuthUserDto): Promise<{
        token: string;
        message: string;
        role: string;
    }>;
    registration(userDto: RegUserDto): Promise<{
        message: string;
    }>;
}
