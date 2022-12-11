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
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class A class that defines the CRUD operations on
 * user object in users collection.
 */
class UserDao {
    /**
     * Lists all the users in the system.
     * @returns List of user object.
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find();
        });
    }
    /**
     * Fetches a single user object based on the user id.
     * @param uid The user id of the object.
     * @returns The JSON object of the user.
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(uid);
        });
    }
    /**
     * Creates a new user in the database.
     * @param user The json representation of user object.
     * @returns The newly created user object.
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create(user);
        });
    }
    /**
     * Deletes an existing user in the database.
     * @param uid The user id for of the user being deleted.
     * @returns The JSON object with delete count.
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
     * Deletes an existing user in the database based on the username.
     * @param username The username for of the user being deleted.
     * @returns The JSON object with delete count.
     */
    deleteUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteMany({ username: username });
        });
    }
    /**
     * Updates the existing user in the database.
     * @param uid The user id for the user being updated.
     * @param user The new user data in the form of request body.
     * @returns The newly created user object.
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
}
exports.default = UserDao;
