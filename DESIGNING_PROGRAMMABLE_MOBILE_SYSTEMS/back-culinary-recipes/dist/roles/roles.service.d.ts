import { User } from 'src/users/users.model';
import { Role } from './roles.model';
import { UserRoles, UpdateRoleDto, CreateRoleDto } from '.';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    createRole(dto: CreateRoleDto): Promise<{
        message: string;
        role: Role;
    }>;
    getRoleByValue(value: string): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Role;
    }>;
    updateRole(id: number, dto: UpdateRoleDto): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Role;
    }>;
    getAllRoles(): Promise<{
        message: string;
        data: Role[];
    }>;
    getUsersByRole(roleValue: string): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: User[];
    }>;
    changeUserRole(userId: number, newRoleId: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: UserRoles;
    }>;
    deleteRole(id: number): Promise<{
        message: string;
    }>;
}
