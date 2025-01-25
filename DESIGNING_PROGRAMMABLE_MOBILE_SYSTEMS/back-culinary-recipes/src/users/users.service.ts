import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Recipe } from 'src/recipes/recipes.model';
import { Category } from 'src/categories';
import { Role, RolesService } from 'src/roles';
import { ChangePasswordDto, UpdateUserDto } from '.';
import { RegUserDto } from 'src/auth';
import { BannedUsers } from 'src/bannedUsers';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  private isSimilar(oldPassword: string, newPassword: string): boolean {
    if (oldPassword === newPassword) return true;

    const similarityThreshold = 0.9;
    const longer = oldPassword.length > newPassword.length ? oldPassword : newPassword;
    const shorter = oldPassword.length > newPassword.length ? newPassword : oldPassword;

    return longer.includes(shorter);
  }

  async createUser(dto: RegUserDto): Promise<{ message: string; user: User }> {
    const user = await this.userRepository.create(dto);
    const { data } = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [data.id]);
    user.roles = [data];
    return { message: 'User created successfully!', user };
  }

  async getUserById(userId: number): Promise<{ message: string; user: User }> {
    const user = await this.userRepository.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          attributes: ['id', 'value', 'description'],
          through: { attributes: [] },
        },
        {
          model: Recipe,
          attributes: [
            'id',
            'title',
            'shortDescription',
            'cookingTime',
            'calories',
            'image',
            'ingredients',
            'instructions',
            'categoryId',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: Category,
              attributes: ['id', 'name', 'description', 'image'],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { message: 'User retrieved successfully!', user };
  }

  async getAllUsers(): Promise<{ message: string; users: User[] }> {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['password', 'updatedAt'] },
      include: [
        {
          model: Role,
          attributes: ['value', 'description'],
          through: { attributes: [] },
        },
        {
          model: BannedUsers,
          attributes: ['email', 'reason'],
        },
        {
          model: Recipe,
          attributes: [
            'id',
            'title',
            'shortDescription',
            'cookingTime',
            'calories',
            'image',
            'ingredients',
            'instructions',
            'categoryId',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: Category,
              attributes: ['id', 'name', 'description', 'image'],
            },
          ],
        },
      ],
    });
    return { message: 'Users retrieved successfully!', users };
  }

  async getUsersByEmail(email: string): Promise<{ message: string; user: User | null }> {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return { message: user ? 'User found!' : 'User not found!', user };
  }

  async updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (updateUserDto.firstName) user.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;

    await user.save();
    return { message: 'User data updated successfully' };
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    if (this.isSimilar(changePasswordDto.currentPassword, changePasswordDto.newPassword)) {
      throw new UnauthorizedException('New password cannot be the same or similar to the old password');
    }

    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await user.save();
    return { message: 'Password changed successfully' };
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      await user.destroy();
      return { message: 'Account deleted!' };
    }
    return { message: 'Account not found, deletion failed!' };
  }
}
