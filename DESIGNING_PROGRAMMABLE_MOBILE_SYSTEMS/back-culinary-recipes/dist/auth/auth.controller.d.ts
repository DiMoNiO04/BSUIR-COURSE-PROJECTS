import { AuthService, AuthUserDto, RegUserDto } from '.';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: AuthUserDto): Promise<{
        message: string;
        token: string;
        role: string;
    }>;
    registration(userDto: RegUserDto): Promise<{
        message: string;
    }>;
}
