import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Dima', description: 'Username' })
  @IsString()
  readonly firstName?: string;

  @ApiProperty({ example: 'Razumov', description: `User's last name` })
  @IsString()
  readonly lastName?: string;
}
