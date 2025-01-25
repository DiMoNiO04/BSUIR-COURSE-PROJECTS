import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangeUserRoleDto {
  @ApiProperty({ example: 1, description: 'Unique id user' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, description: 'Unique id role' })
  @IsInt()
  @IsNotEmpty()
  newRoleId: number;
}
