"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodErrorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "validation failed",
            errorsMessage: {
                name: "ZodError",
                error: err.issues,
            },
        });
    }
    next(err);
};
exports.default = zodErrorHandler;
