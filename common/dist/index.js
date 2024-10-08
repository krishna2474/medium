"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputs = exports.createBlogInputs = exports.signinInput = exports.signupInputs = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInputs = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createBlogInputs = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogInputs = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
