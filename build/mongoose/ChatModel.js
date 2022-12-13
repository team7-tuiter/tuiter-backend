"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the chat collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const ChatSchema_1 = __importDefault(require("./ChatSchema"));
const ChatModel = mongoose_1.default.model("ChatModel", ChatSchema_1.default);
exports.default = ChatModel;
