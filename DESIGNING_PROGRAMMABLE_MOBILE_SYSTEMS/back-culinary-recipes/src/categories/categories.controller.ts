import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from '.';
import { Category } from '.';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: Category })
  @Post('/createCategory')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/getAllCategories')
  getAll() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: 'Get category by name' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/getCategory/:name')
  async getById(@Param('name') name: string) {
    return this.categoriesService.getCategoryById(name);
  }

  @ApiOperation({ summary: 'Update category by name' })
  @ApiResponse({ status: 200, type: Category })
  @Patch('/updateCategory/:name')
  async update(@Param('name') name: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(name, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete category by name' })
  @ApiResponse({ status: 204 })
  @Delete('/deleteCategory/:name')
  delete(@Param('name') name: string) {
    return this.categoriesService.deleteCategory(name);
  }
}
