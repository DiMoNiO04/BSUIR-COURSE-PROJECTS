import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, AuthUserDto, RegUserDto } from '.';
import { User } from 'src/users';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authorization' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  async login(@Body() userDto: AuthUserDto) {
    const result = await this.authService.login(userDto);
    return { message: result.message, token: result.token, role: result.role };
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201 })
  @Post('/registration')
  async registration(@Body() userDto: RegUserDto) {
    const result = await this.authService.registration(userDto);
    return { message: result.message };
  }
}
