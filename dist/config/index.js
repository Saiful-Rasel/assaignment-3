"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.mongodb_uri = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_uri = process.env.MONGODB_URL;
exports.mongodb_uri = mongodb_uri;
const port = process.env.PORT;
exports.port = port;
