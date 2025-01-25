import { BannedUsers } from './banned-users.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users';
export declare class BannedUsersService {
    private bannedUsersRepository;
    private userRepository;
    private readonly userService;
    constructor(bannedUsersRepository: typeof BannedUsers, userRepository: typeof User, userService: UsersService);
    banUser(requesterId: number, userId: number, reason: string): Promise<{
        message: string;
    }>;
    unbanUser(userId: number): Promise<{
        message: string;
    }>;
    isUserBanned(email: string): Promise<boolean>;
}
