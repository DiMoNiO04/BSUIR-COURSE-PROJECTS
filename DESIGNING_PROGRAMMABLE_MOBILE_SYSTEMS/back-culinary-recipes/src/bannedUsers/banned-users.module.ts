import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { BannedUsers } from './banned-users.model';
import { BannedUsersController } from './banned-users.controller';
import { BannedUsersService } from './banned-users.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([BannedUsers, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    JwtModule,
  ],
  controllers: [BannedUsersController],
  providers: [BannedUsersService],
  exports: [BannedUsersService],
})
export class BannedUsersModule {}
