"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoseErrorHandler = void 0;
const mongoseErrorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Mongoose validation failed",
            error: err.message,
            errors: err.errors,
        });
    }
    next(err);
};
exports.mongoseErrorHandler = mongoseErrorHandler;
