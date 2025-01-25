import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto, UpdateCategoryDto } from '.';
import { Op } from 'sequelize';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

  private validateBase64Image(image: string): boolean {
    return /^data:image\/\w+;base64,/.test(image);
  }

  async createCategory(dto: CreateCategoryDto): Promise<{ category: Category; message: string }> {
    if (dto.image && !this.validateBase64Image(dto.image)) {
      throw new HttpException('Invalid image format', HttpStatus.BAD_REQUEST);
    }

    const existingCategory = await this.categoryRepository.findOne({ where: { name: dto.name } });
    if (existingCategory) {
      throw new HttpException('Category name must be unique', HttpStatus.BAD_REQUEST);
    }

    const category = await this.categoryRepository.create({ ...dto });
    return { category, message: 'Category created successfully' };
  }

  async getAllCategories(): Promise<{ data: Category[]; message: string }> {
    const categories = await this.categoryRepository.findAll({
      order: [['name', 'ASC']],
    });
    return { data: categories, message: 'All categories retrieved successfully' };
  }

  async getCategoryById(name: string): Promise<{ data: Category; message: string }> {
    const category = await this.categoryRepository.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (!category) throw new NotFoundException(`Category with name "${name}" not found`);
    return { data: category, message: 'Category retrieved successfully' };
  }

  async updateCategory(name: string, dto: UpdateCategoryDto): Promise<{ category: Category; message: string }> {
    if (dto.image && !this.validateBase64Image(dto.image)) {
      throw new HttpException('Invalid image format', HttpStatus.BAD_REQUEST);
    }

    const category = await this.categoryRepository.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (!category) throw new NotFoundException(`Category with name "${name}" not found`);

    if (dto.name && dto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: dto.name } });
      if (existingCategory) {
        throw new HttpException('Category name must be unique', HttpStatus.BAD_REQUEST);
      }
    }

    await category.update({ ...dto });
    return { category, message: 'Category updated successfully' };
  }

  async deleteCategory(name: string): Promise<{ message: string }> {
    const category = await this.categoryRepository.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (!category) throw new NotFoundException(`Category with name "${name}" not found`);

    await category.destroy();
    return { message: 'Category deleted successfully' };
  }
}
