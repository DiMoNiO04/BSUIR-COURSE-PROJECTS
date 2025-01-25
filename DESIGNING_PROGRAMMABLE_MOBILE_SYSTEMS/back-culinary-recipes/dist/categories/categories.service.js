"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const categories_model_1 = require("./categories.model");
const sequelize_2 = require("sequelize");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    validateBase64Image(image) {
        return /^data:image\/\w+;base64,/.test(image);
    }
    async createCategory(dto) {
        if (dto.image && !this.validateBase64Image(dto.image)) {
            throw new common_1.HttpException('Invalid image format', common_1.HttpStatus.BAD_REQUEST);
        }
        const existingCategory = await this.categoryRepository.findOne({ where: { name: dto.name } });
        if (existingCategory) {
            throw new common_1.HttpException('Category name must be unique', common_1.HttpStatus.BAD_REQUEST);
        }
        const category = await this.categoryRepository.create({ ...dto });
        return { category, message: 'Category created successfully' };
    }
    async getAllCategories() {
        const categories = await this.categoryRepository.findAll({
            order: [['name', 'ASC']],
        });
        return { data: categories, message: 'All categories retrieved successfully' };
    }
    async getCategoryById(name) {
        const category = await this.categoryRepository.findOne({
            where: {
                name: {
                    [sequelize_2.Op.iLike]: name,
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException(`Category with name "${name}" not found`);
        return { data: category, message: 'Category retrieved successfully' };
    }
    async updateCategory(name, dto) {
        if (dto.image && !this.validateBase64Image(dto.image)) {
            throw new common_1.HttpException('Invalid image format', common_1.HttpStatus.BAD_REQUEST);
        }
        const category = await this.categoryRepository.findOne({
            where: {
                name: {
                    [sequelize_2.Op.iLike]: name,
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException(`Category with name "${name}" not found`);
        if (dto.name && dto.name !== category.name) {
            const existingCategory = await this.categoryRepository.findOne({ where: { name: dto.name } });
            if (existingCategory) {
                throw new common_1.HttpException('Category name must be unique', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        await category.update({ ...dto });
        return { category, message: 'Category updated successfully' };
    }
    async deleteCategory(name) {
        const category = await this.categoryRepository.findOne({
            where: {
                name: {
                    [sequelize_2.Op.iLike]: name,
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException(`Category with name "${name}" not found`);
        await category.destroy();
        return { message: 'Category deleted successfully' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(categories_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map