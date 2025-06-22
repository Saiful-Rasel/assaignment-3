"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
exports.bookRoute = express_1.default.Router();
exports.bookRoute.post('/', book_controller_1.createBook);
exports.bookRoute.get('/', book_controller_1.getAllBook);
exports.bookRoute.get('/:bookId', book_controller_1.getSingleBook);
exports.bookRoute.patch('/:bookId', book_controller_1.updateSingleBook);
exports.bookRoute.delete('/:bookId', book_controller_1.deleteSingleBook);
