import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoles, RolesService, RolesController, Role } from '.';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), forwardRef(() => AuthModule), JwtModule],
  exports: [RolesService],
})
export class RolesModule {}
