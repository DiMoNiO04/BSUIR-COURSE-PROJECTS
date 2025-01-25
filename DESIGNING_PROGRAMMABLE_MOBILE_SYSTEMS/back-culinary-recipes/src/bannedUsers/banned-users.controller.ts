import { Body, Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BannedUsersService } from './banned-users.service';
import { UsersBannedDto, BannedUsers } from '.';
import { Roles } from 'src/roles';
import { JwtAuthGuard, RolesGuard } from 'src/guards';

@ApiTags('Banned Users')
@Controller('banned-users')
export class BannedUsersController {
  constructor(private bannedUsersService: BannedUsersService) {}

  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/ban')
  async banUser(@Request() req, @Body() banUserDto: UsersBannedDto) {
    const { userId, reason } = banUserDto;
    const requesterId = req.user.id;
    return await this.bannedUsersService.banUser(requesterId, userId, reason);
  }

  @ApiOperation({ summary: 'Unban a user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/unban/:userId')
  async unbanUser(@Param('userId') userId: number) {
    return await this.bannedUsersService.unbanUser(userId);
  }
}
