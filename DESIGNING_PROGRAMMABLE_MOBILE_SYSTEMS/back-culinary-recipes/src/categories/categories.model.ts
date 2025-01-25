import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany, Unique } from 'sequelize-typescript';
import { Recipe } from 'src/recipes/recipes.model';

interface CategoryCreationAttrs {
  name: string;
  description: string;
  image: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Salad', description: 'Category name' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @ApiProperty({ example: 'Category description', description: 'Category description' })
  @Column({ type: DataType.TEXT('long'), allowNull: false })
  description: string;

  @ApiProperty({ example: 'image.png', description: 'Category image' })
  @Column({ type: DataType.TEXT('long'), allowNull: true })
  image: string;

  @ApiProperty({ example: '5', description: 'Count of recipes in this category' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  countrecipes: number;

  @HasMany(() => Recipe)
  recipes: Recipe[];
}
