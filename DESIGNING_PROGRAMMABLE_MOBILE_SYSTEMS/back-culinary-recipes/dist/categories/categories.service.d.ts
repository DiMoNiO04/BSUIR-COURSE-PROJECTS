import { Category } from './categories.model';
import { CreateCategoryDto, UpdateCategoryDto } from '.';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: typeof Category);
    private validateBase64Image;
    createCategory(dto: CreateCategoryDto): Promise<{
        category: Category;
        message: string;
    }>;
    getAllCategories(): Promise<{
        data: Category[];
        message: string;
    }>;
    getCategoryById(name: string): Promise<{
        data: Category;
        message: string;
    }>;
    updateCategory(name: string, dto: UpdateCategoryDto): Promise<{
        category: Category;
        message: string;
    }>;
    deleteCategory(name: string): Promise<{
        message: string;
    }>;
}
