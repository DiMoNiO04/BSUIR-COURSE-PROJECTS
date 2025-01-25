import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456', description: 'Current password' })
  @IsString()
  @IsNotEmpty()
  readonly currentPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'New password' })
  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'Confirm new password' })
  @IsString()
  @IsNotEmpty()
  readonly confirmPassword: string;
}
