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
exports.Recipe = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
const categories_1 = require("../categories");
let Recipe = class Recipe extends sequelize_typescript_1.Model {
};
exports.Recipe = Recipe;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique identifier' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Recipe.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Zesar', description: 'Recipe name' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Short description', description: 'Short description' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Recipe.prototype, "shortDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '30', description: 'Cooking time in minutes' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "cookingTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '400', description: 'Calories' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image.png', description: 'Recipe image' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT('long'), allowNull: true }),
    __metadata("design:type", String)
], Recipe.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ingredients', description: 'Ingredients' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Recipe.prototype, "ingredients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Instructions', description: 'Instructions' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Recipe.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is the recipe published or not' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Recipe.prototype, "isPublished", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => categories_1.Category),
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Category id' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Recipe.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => categories_1.Category),
    __metadata("design:type", categories_1.Category)
], Recipe.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Author (user id)' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Recipe.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Recipe.prototype, "author", void 0);
exports.Recipe = Recipe = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'recipes' })
], Recipe);
//# sourceMappingURL=recipes.model.js.map