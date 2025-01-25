import { Model } from 'sequelize-typescript';
import { BannedUsers } from 'src/bannedUsers/banned-users.model';
import { Recipe } from 'src/recipes/recipes.model';
import { Role } from 'src/roles';
interface UserCreationAttrs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countrecipes: number;
    bannedId: number;
    bannedUser: BannedUsers[];
    roles: Role[];
    recipes: Recipe[];
}
export {};
