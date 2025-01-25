"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = exports.AuthService = exports.AuthController = exports.AuthUserDto = exports.RegUserDto = void 0;
var reg_user_dto_1 = require("./dto/reg-user.dto");
Object.defineProperty(exports, "RegUserDto", { enumerable: true, get: function () { return reg_user_dto_1.RegUserDto; } });
var auth_user_dto_1 = require("./dto/auth-user.dto");
Object.defineProperty(exports, "AuthUserDto", { enumerable: true, get: function () { return auth_user_dto_1.AuthUserDto; } });
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return auth_controller_1.AuthController; } });
var auth_service_1 = require("./auth.service");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_service_1.AuthService; } });
var auth_module_1 = require("./auth.module");
Object.defineProperty(exports, "AuthModule", { enumerable: true, get: function () { return auth_module_1.AuthModule; } });
//# sourceMappingURL=index.js.map