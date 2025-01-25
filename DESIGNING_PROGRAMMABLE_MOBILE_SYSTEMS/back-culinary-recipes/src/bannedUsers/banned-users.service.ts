import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BannedUsers } from './banned-users.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users';

@Injectable()
export class BannedUsersService {
  constructor(
    @InjectModel(BannedUsers) private bannedUsersRepository: typeof BannedUsers,
    @InjectModel(User) private userRepository: typeof User,
    private readonly userService: UsersService
  ) {}

  async banUser(requesterId: number, userId: number, reason: string): Promise<{ message: string }> {
    if (requesterId === userId) {
      return { message: 'You cannot ban yourself!' };
    }

    const user = await this.userRepository.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    const alreadyBanned = await this.bannedUsersRepository.findOne({ where: { userId } });
    if (alreadyBanned) {
      return { message: 'User is already banned!' };
    }

    const bannedUser = await this.bannedUsersRepository.create({
      reason,
      email: user.email,
      userId,
    });

    await this.userRepository.update({ bannedId: bannedUser.id }, { where: { id: userId } });

    return { message: 'User banned successfully!' };
  }

  async unbanUser(userId: number): Promise<{ message: string }> {
    const user = await this.userRepository.findByPk(userId);
    if (user && user.bannedId) {
      await this.bannedUsersRepository.destroy({ where: { id: user.bannedId } });
      await this.userRepository.update({ bannedId: null }, { where: { id: userId } });
      return { message: 'User unbanned successfully!' };
    }
    return { message: 'User not found or was not banned!' };
  }

  async isUserBanned(email: string): Promise<boolean> {
    const bannedUser = await this.bannedUsersRepository.findOne({ where: { email } });
    return !!bannedUser;
  }
}
