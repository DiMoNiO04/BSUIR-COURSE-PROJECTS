import { CreateCategoryDto, UpdateCategoryDto } from '.';
import { Category } from '.';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        category: Category;
        message: string;
    }>;
    getAll(): Promise<{
        data: Category[];
        message: string;
    }>;
    getById(name: string): Promise<{
        data: Category;
        message: string;
    }>;
    update(name: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        category: Category;
        message: string;
    }>;
    delete(name: string): Promise<{
        message: string;
    }>;
}
