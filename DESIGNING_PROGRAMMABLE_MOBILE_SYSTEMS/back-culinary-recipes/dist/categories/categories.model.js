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
exports.Category = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const recipes_model_1 = require("../recipes/recipes.model");
let Category = class Category extends sequelize_typescript_1.Model {
};
exports.Category = Category;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique identifier' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Salad', description: 'Category name' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Category description', description: 'Category description' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT('long'), allowNull: false }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image.png', description: 'Category image' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT('long'), allowNull: true }),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5', description: 'Count of recipes in this category' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "countrecipes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => recipes_model_1.Recipe),
    __metadata("design:type", Array)
], Category.prototype, "recipes", void 0);
exports.Category = Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'categories' })
], Category);
//# sourceMappingURL=categories.model.js.map