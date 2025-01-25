import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table, ForeignKey, HasOne } from 'sequelize-typescript';
import { BannedUsers } from 'src/bannedUsers/banned-users.model';
import { Recipe } from 'src/recipes/recipes.model';
import { Role, UserRoles } from 'src/roles';

interface UserCreationAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Dima', description: 'Username' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Razumov', description: `User's last name` })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Postal address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: '5', description: 'Count of recipes in this category' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  countrecipes: number;

  @ForeignKey(() => BannedUsers)
  @Column({ type: DataType.INTEGER, allowNull: true })
  bannedId: number;

  @HasOne(() => BannedUsers)
  bannedUser: BannedUsers[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Recipe)
  recipes: Recipe[];
}
