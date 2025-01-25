import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeDto {
  @ApiProperty({ example: 'Zesar', description: 'Recipe name', required: false })
  readonly title: string;

  @ApiProperty({ example: 'Delicious zesar', description: 'Short description', required: false })
  readonly shortDescription: string;

  @ApiProperty({ example: '30', description: 'Cooking time in minutes', required: false })
  readonly cookingTime: number;

  @ApiProperty({ example: '400', description: 'Calories', required: false })
  readonly calories: number;

  @ApiProperty({ example: 'image.png', description: 'Recipe image', required: false })
  readonly image: string;

  @ApiProperty({ example: 'Potatp', description: 'Ingredients', required: false })
  readonly ingredients: string;

  @ApiProperty({ example: '1. Buy potato', description: 'Instructions', required: false })
  readonly instructions: string;

  @ApiProperty({ example: '1', description: 'Category id', required: false })
  readonly categoryId: number;

  @ApiProperty({ example: '1', description: 'Author id', required: false })
  readonly authorId: number;
}
