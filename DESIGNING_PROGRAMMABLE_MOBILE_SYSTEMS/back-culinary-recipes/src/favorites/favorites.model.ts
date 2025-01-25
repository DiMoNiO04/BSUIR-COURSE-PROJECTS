import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from 'src/users';
import { Recipe } from 'src/recipes';

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Recipe)
  @Column({ type: DataType.INTEGER, allowNull: false })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
