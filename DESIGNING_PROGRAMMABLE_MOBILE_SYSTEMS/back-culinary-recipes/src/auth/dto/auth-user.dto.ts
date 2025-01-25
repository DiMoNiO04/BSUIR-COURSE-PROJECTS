import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
