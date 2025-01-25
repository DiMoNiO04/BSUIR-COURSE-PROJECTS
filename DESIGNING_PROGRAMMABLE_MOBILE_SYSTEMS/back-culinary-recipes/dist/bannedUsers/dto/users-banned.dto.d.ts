import { Model } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
export declare class UsersBannedDto extends Model<UsersBannedDto> {
    reason: string;
    userId: number;
    user: User;
}
