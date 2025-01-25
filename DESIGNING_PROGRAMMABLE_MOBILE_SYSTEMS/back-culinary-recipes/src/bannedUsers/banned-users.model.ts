import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({ tableName: 'banned_users', updatedAt: false })
export class BannedUsers extends Model<BannedUsers> {
  @ApiProperty({ example: 'user@mail.com', description: 'Email of the banned user' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Spam activity', description: 'Reason for banning' })
  @Column({ type: DataType.STRING, allowNull: false })
  reason: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
