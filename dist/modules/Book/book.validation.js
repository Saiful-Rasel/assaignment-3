"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookZodSchema = void 0;
const zod_1 = require("zod");
const genreEnum = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
];
exports.createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        author: zod_1.z.string(),
        genre: zod_1.z.enum(genreEnum).optional(),
        isbn: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        copies: zod_1.z.number().min(0),
        available: zod_1.z.boolean().optional(),
    }),
});
