import { BannedUsersService } from './banned-users.service';
import { UsersBannedDto } from '.';
export declare class BannedUsersController {
    private bannedUsersService;
    constructor(bannedUsersService: BannedUsersService);
    banUser(req: any, banUserDto: UsersBannedDto): Promise<{
        message: string;
    }>;
    unbanUser(userId: number): Promise<{
        message: string;
    }>;
}
