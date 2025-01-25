import { User } from './users.model';
import { RolesService } from 'src/roles';
import { ChangePasswordDto, UpdateUserDto } from '.';
import { RegUserDto } from 'src/auth';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    private isSimilar;
    createUser(dto: RegUserDto): Promise<{
        message: string;
        user: User;
    }>;
    getUserById(userId: number): Promise<{
        message: string;
        user: User;
    }>;
    getAllUsers(): Promise<{
        message: string;
        users: User[];
    }>;
    getUsersByEmail(email: string): Promise<{
        message: string;
        user: User | null;
    }>;
    updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
