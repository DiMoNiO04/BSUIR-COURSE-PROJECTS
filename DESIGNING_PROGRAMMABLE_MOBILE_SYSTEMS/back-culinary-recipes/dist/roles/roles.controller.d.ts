import { User } from 'src/users/users.model';
import { RolesService } from './roles.service';
import { ChangeUserRoleDto, CreateRoleDto, Role } from '.';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(dto: CreateRoleDto): Promise<{
        message: string;
        role: Role;
    }>;
    getAllRoles(): Promise<{
        message: string;
        data: Role[];
    }>;
    getRole(value: string): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Role;
    }>;
    getUsersByRole(roleValue: string): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: User[];
    }>;
    updateRole(id: number, dto: CreateRoleDto): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Role;
    }>;
    changeUserRole(changeUserRoleDto: ChangeUserRoleDto): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: import("./user-roles.model").UserRoles;
    }>;
    deleteRole(id: number): Promise<{
        message: string;
    }>;
}
