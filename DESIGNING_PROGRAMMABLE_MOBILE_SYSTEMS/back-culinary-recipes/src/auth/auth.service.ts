import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthUserDto, RegUserDto } from '.';
import { BannedUsersService } from 'src/bannedUsers';
import { User, UsersService } from 'src/users';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private bannedUsersService: BannedUsersService
  ) {}

  private async generateToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles.map((role) => ({
        id: role.id,
        value: role.value,
      })),
    };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: RegUserDto | AuthUserDto): Promise<{ message: string; user: User }> {
    const { user } = await this.userService.getUsersByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect email or password!' });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return { message: 'User validated successfully!', user };
    }

    throw new UnauthorizedException({ message: 'Incorrect email or password!' });
  }

  async login(userDto: AuthUserDto): Promise<{ token: string; message: string; role: string }> {
    if (await this.bannedUsersService.isUserBanned(userDto.email)) {
      throw new UnauthorizedException({ message: 'Your account is banned!' });
    }

    const { user } = await this.validateUser(userDto);
    const token = await this.generateToken(user);

    const payload = this.jwtService.decode(token);

    return {
      role: payload.roles[0].value,
      token,
      message: 'You are logged in!',
    };
  }

  async registration(userDto: RegUserDto): Promise<{ message: string }> {
    if (await this.bannedUsersService.isUserBanned(userDto.email)) {
      throw new HttpException('Account with email is banned!', HttpStatus.FORBIDDEN);
    }
    const candidate = await this.userService.getUsersByEmail(userDto.email);
    if (candidate.user) {
      throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    await this.userService.createUser({ ...userDto, password: hashPassword });
    return {
      message: 'Registration successful! Log in',
    };
  }
}
