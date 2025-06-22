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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowSummary = exports.createBorrow = void 0;
const borrow_validation_1 = require("./borrow.validation");
const borrow_model_1 = require("./borrow.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodValidation = yield borrow_validation_1.createBorrowZodSchema.parseAsync(req.body);
        const bookId = new mongoose_1.default.Types.ObjectId(zodValidation.book);
        yield borrow_model_1.BorrowModel.borrowLogic(bookId, zodValidation.quantity);
        const createdData = yield borrow_model_1.BorrowModel.create(zodValidation);
        res.json({
            success: true,
            message: "Borrow created successfully",
            data: createdData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBorrow = createBorrow;
const borrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.BorrowModel.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: "$bookDetails._id",
                    title: "$bookDetails.title",
                    isbn: "$bookDetails.isbn",
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowSummary = borrowSummary;
