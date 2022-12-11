"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @file A tuits schema for tuit model.
 */
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: {
        type: String,
        ref: 'UserModel',
        required: true,
    },
    likesCount: { type: Number, default: 0 },
}, { collection: 'tuits' });
exports.default = TuitSchema;
