import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Soup', description: 'Category name' })
  readonly name: string;

  @ApiProperty({ example: 'Description', description: 'Category description' })
  readonly description: string;

  @ApiProperty({ example: 'data:image/png;base64,iVBORw0K...', description: 'Category image in base64 format' })
  readonly image: string;

  @ApiProperty({ example: '0', description: 'Initial count of recipes' })
  readonly countrecipes?: number;
}
