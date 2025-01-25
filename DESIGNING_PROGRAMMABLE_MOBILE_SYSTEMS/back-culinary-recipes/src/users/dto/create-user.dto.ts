import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Dima', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Razumov', description: `User's last name` })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
