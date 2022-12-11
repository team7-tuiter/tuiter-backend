"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountType_1 = __importDefault(require("../models/AccountType"));
const MaritalStatus_1 = __importDefault(require("../models/MaritalStatus"));
/**
 * @file A user schema for user model.
 */
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    firstName: { type: String },
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: { type: String, default: AccountType_1.default.Personal, enum: AccountType_1.default },
    maritalStatus: { type: String, default: MaritalStatus_1.default.Single, enum: MaritalStatus_1.default },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    },
    totalFollowers: { type: Number, default: 0 },
    totalPosts: { type: Number, default: 0 },
}, { collection: 'users' });
exports.default = UserSchema;
