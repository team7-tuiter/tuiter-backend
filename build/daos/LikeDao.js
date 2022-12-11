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
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
/**
 * @class The class which is responsible for CRUD operations
 * for the likes model.
 *
 * @property {LikeDao} likeDao Singleton DAO implementing likes
 * CRUD operations
 */
class LikeDao {
    constructor() {
        /**
         * Finds all the users who liked a specific tuit.
         *
         * @param tid The tuit id for which users needs to fetched.
         * @returns The array of like objects populated with user object.
         *
         */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid })
                .populate("likedBy")
                .exec();
        });
        /**
         * Find all the tuits that is liked by a user.
         *
         * @param uid The userid for which the all tuits needs to be fetched.
         * @returns Array of like object populated with tuit object.
         */
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid })
                .populate("tuit")
                .exec();
        });
        /**
         * Saves an entry of a user liking a tuit.
         *
         * @param uid The userid who is liking the tuit.
         * @param tid The tuit being liked.
         * @returns the like object.
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid }); });
        /**
         * Removes the entry of user liking a tuit.
         * @param uid The user who is liking the tuit.
         * @param tid The tuit id that is being unliked.
         * @returns Json object with delete count
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates singleton dao instance.
 *
 * @return FollowDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
