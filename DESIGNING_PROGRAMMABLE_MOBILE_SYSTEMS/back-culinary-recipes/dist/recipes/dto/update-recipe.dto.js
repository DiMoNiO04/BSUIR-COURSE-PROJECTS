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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecipeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateRecipeDto {
}
exports.UpdateRecipeDto = UpdateRecipeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Zesar', description: 'Recipe name', required: false }),
    __metadata("design:type", String)
], UpdateRecipeDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Delicious zesar', description: 'Short description', required: false }),
    __metadata("design:type", String)
], UpdateRecipeDto.prototype, "shortDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '30', description: 'Cooking time in minutes', required: false }),
    __metadata("design:type", Number)
], UpdateRecipeDto.prototype, "cookingTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '400', description: 'Calories', required: false }),
    __metadata("design:type", Number)
], UpdateRecipeDto.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image.png', description: 'Recipe image', required: false }),
    __metadata("design:type", String)
], UpdateRecipeDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Potatp', description: 'Ingredients', required: false }),
    __metadata("design:type", String)
], UpdateRecipeDto.prototype, "ingredients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1. Buy potato', description: 'Instructions', required: false }),
    __metadata("design:type", String)
], UpdateRecipeDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Category id', required: false }),
    __metadata("design:type", Number)
], UpdateRecipeDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Author id', required: false }),
    __metadata("design:type", Number)
], UpdateRecipeDto.prototype, "authorId", void 0);
//# sourceMappingURL=update-recipe.dto.js.map