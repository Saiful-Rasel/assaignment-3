"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
exports.borrowRoute = express_1.default.Router();
exports.borrowRoute.post('/', borrow_controller_1.createBorrow);
exports.borrowRoute.get('/', borrow_controller_1.borrowSummary);
