"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./modules/Book/book.route");
const zodErrorHandler_1 = __importDefault(require("./middleware/zodErrorHandler"));
const borrow_route_1 = require("./modules/Borrow/borrow.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/books', book_route_1.bookRoute);
app.use('/borrow', borrow_route_1.borrowRoute);
//error handler  middleware 
app.use(zodErrorHandler_1.default);
app.get("/", (req, res) => {
    res.send("Assignment_3");
});
exports.default = app;
