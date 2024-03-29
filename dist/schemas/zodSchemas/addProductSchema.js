"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.addProductSchema = void 0;
const zod_1 = require("zod");
exports.addProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(255),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
    description: zod_1.z.string().min(2).max(255),
    image: zod_1.z.string().min(2).max(255),
    categoryId: zod_1.z.number().positive(),
});
exports.deleteProductSchema = zod_1.z.object({
    product_id: zod_1.z.number().positive(),
});
