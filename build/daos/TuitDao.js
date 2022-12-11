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
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class The class which is responsible for CRUD operations
 * for the Tuit model.
 *
 * @see TuitDaoI
 */
class TuitDao {
    /**
     * Find all the tuits that exists in the database.
     * @returns A promise that resolves to array of tuits.
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find();
        });
    }
    /**
     * Finds the tuit for the specific user.
     * @param uid The user for which tuits needs to be found.
     * @returns The promise that resolves to array of tuits.
     */
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find({ postedBy: uid });
        });
    }
    /**
     * Find the tuit by specific tuit id.
     * @param tid The tuit id
     * @returns A promise that resolves to tuit object
     */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.findById(tid);
        });
    }
    /**
     * Creates a new entry for the tuit in the database.
     * @param tuit The Json object that represents tuit.
     * @returns The JSON of newly created tuit object.
     */
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(tuit);
        });
    }
    /**
     * Updates the existing tuit in the database.
     * @param tid The id of the tuit to be updated.
     * @param tuit The json object of the tuit.
     * @returns The json for newly created tuit.
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
    /**
     * Deletes the existing tuit based on the tuit id.
     * @param tid The tuit id for tuit needs to be deleted.
     * @returns The JSON object with the delete count.
     */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
}
exports.default = TuitDao;
