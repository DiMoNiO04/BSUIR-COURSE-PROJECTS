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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const bannedUsers_1 = require("../bannedUsers");
const users_1 = require("../users");
let AuthService = class AuthService {
    constructor(userService, jwtService, bannedUsersService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.bannedUsersService = bannedUsersService;
    }
    async generateToken(user) {
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles.map((role) => ({
                id: role.id,
                value: role.value,
            })),
        };
        return this.jwtService.sign(payload);
    }
    async validateUser(userDto) {
        const { user } = await this.userService.getUsersByEmail(userDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException({ message: 'Incorrect email or password!' });
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return { message: 'User validated successfully!', user };
        }
        throw new common_1.UnauthorizedException({ message: 'Incorrect email or password!' });
    }
    async login(userDto) {
        if (await this.bannedUsersService.isUserBanned(userDto.email)) {
            throw new common_1.UnauthorizedException({ message: 'Your account is banned!' });
        }
        const { user } = await this.validateUser(userDto);
        const token = await this.generateToken(user);
        const payload = this.jwtService.decode(token);
        return {
            role: payload.roles[0].value,
            token,
            message: 'You are logged in!',
        };
    }
    async registration(userDto) {
        if (await this.bannedUsersService.isUserBanned(userDto.email)) {
            throw new common_1.HttpException('Account with email is banned!', common_1.HttpStatus.FORBIDDEN);
        }
        const candidate = await this.userService.getUsersByEmail(userDto.email);
        if (candidate.user) {
            throw new common_1.HttpException('A user with this email exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        await this.userService.createUser({ ...userDto, password: hashPassword });
        return {
            message: 'Registration successful! Log in',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_1.UsersService,
        jwt_1.JwtService,
        bannedUsers_1.BannedUsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map