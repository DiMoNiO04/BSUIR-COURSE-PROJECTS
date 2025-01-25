import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
export declare class BannedUsers extends Model<BannedUsers> {
    email: string;
    reason: string;
    userId: number;
    user: User;
}
