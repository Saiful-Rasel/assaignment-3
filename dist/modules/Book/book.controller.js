"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleBook = exports.updateSingleBook = exports.getSingleBook = exports.getAllBook = exports.createBook = void 0;
const book_validation_1 = require("./book.validation");
const book_models_1 = require("./book.models");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodValidation = yield book_validation_1.createBookZodSchema.parseAsync({
            body: req.body,
        });
        const createData = yield book_models_1.BookModel.create(zodValidation.body);
        res.json({
            success: true,
            message: "Book Created Successfully",
            data: createData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
// get all Book
const getAllBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre, sortBy, sort, limit } = req.query;
        const query = {};
        if (genre) {
            query.genre = genre;
        }
        const books = yield book_models_1.BookModel.find(query)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBook = getAllBook;
// single book
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const singleBook = yield book_models_1.BookModel.findById(bookId);
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: singleBook,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleBook = getSingleBook;
// update book
const updateSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const updatedData = yield book_models_1.BookModel.findByIdAndUpdate(bookId, body, {
            new: true,
        });
        res.json({
            success: true,
            message: "Book updated successfully",
            data: updatedData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateSingleBook = updateSingleBook;
// delete single book
const deleteSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deleteBook = yield book_models_1.BookModel.findByIdAndDelete(bookId);
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: deleteBook,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSingleBook = deleteSingleBook;
