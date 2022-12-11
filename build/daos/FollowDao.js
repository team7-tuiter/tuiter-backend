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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class The class which is responsible for CRUD operations
 * for the users follow model.
 *
 * @property {FollowDao} followDao Singleton DAO implementing likes
 * CRUD operations
 */
class FollowDao {
    constructor() {
        /**
         * Creates a new entry in the follow table.
         *
         * @param uid The user who is following
         * @param tuid The user who is being followed
         * @returns Follow object
         */
        this.followUser = (uid, tuid) => __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.create({ followedBy: uid, following: tuid });
        });
        /**
         * Unfollows the existing user which is being followed.
         *
         * @param uid The user who is trying to unfollow
         * @param tuid The target user which is being unfollowed
         * @returns The json object with delete count.
         */
        this.unfollowUser = (uid, tuid) => __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.deleteOne({ followedBy: uid, following: tuid });
        });
        /**
         * List the followers of the user.
         *
         * @param uid The user id for which the follower needs to be listed
         * @returns JSON Array of the follow objects populated with user.
         */
        this.listUserFollowers = (uid) => __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.find({ following: uid }).select("followedBy").populate('followedBy');
        });
        /**
         * List the users whom i am following.
         *
         * @param uid The user id of the user.
         * @returns JSON Array of the follow objects populated with user.
         */
        this.listUserFollowings = (uid) => __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.find({ followedBy: uid }).select("following").populate('following');
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton dao instance.
 *
 * @return FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
