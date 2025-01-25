import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Unique meaning of the role' })
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role Description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
