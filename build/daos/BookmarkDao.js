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
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class A class that provides all the CRUD operations on
 * bookmarks collection.
 *
 * @property bookmarkDao Singleton pattern dao object
 *  to do database operations.
 */
class BookmarkDao {
    constructor() {
        /**
         * Creates a new bookmark model and saves in the database.
         *
         * @param uid The userid who is bookmarking the data.
         * @param tid The tuit id which is getting bookmarked.
         * @returns The bookmark object.
         */
        this.createBookmark = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.create({ bookmarkedBy: uid, bookmarkedTuit: tid });
        });
        /**
         * Deletes an existing bookmark for a user.
         * @param uid The user id of the user.
         * @param tid The tuit id of the tuit.
         * @returns Json Object with delete count
         */
        this.deleteBookmark = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid });
        });
        /**
         * List all the bookmarks for a specific user.
         *
         * @param uid The user for which the bookmarks needs to be listed.
         * @returns The JSON Array of bookmarks
         */
        this.listBookmarks = (uid) => __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.find({ bookmarkedBy: uid }).populate("bookmarkedTuit");
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton dao instance.
 *
 * @return BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
