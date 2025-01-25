import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';
import { Role, UserRoles } from 'src/roles';
import { UsersService, UsersController, User } from 'src/users';
import { AuthModule } from 'src/auth';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule, forwardRef(() => AuthModule), JwtModule],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
