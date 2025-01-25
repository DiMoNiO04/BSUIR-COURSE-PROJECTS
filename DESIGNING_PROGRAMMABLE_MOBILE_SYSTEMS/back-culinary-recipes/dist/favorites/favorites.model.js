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
exports.Favorite = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("../users");
const recipes_1 = require("../recipes");
let Favorite = class Favorite extends sequelize_typescript_1.Model {
};
exports.Favorite = Favorite;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Favorite.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => recipes_1.Recipe),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Favorite.prototype, "recipeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => recipes_1.Recipe),
    __metadata("design:type", recipes_1.Recipe)
], Favorite.prototype, "recipe", void 0);
exports.Favorite = Favorite = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'favorites' })
], Favorite);
//# sourceMappingURL=favorites.model.js.map