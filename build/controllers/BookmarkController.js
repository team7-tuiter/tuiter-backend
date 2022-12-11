"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
/**
 * @class BookmarkController Implements RESTful Web service API for
 * bookmarks CRUD operations on bookmarks.
 *
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to retrieve all bookmarks that a user have
 *     </li>
 *     <li>POST /users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to delete that a user
 *     no longer needs a tuit bookmark</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
class BookmarkController {
    /**
     * Private constructor because we want singleton pattern to be used
     * for creating object of this class.
     */
    constructor() {
        /**
         * Creates a new bookmark by saving the user and the tuit in the database.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the bookmarked tuit, and uid representing user who
         * bookmarked the tuit.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON objec containing the new bookmark
         */
        this.createBookmark = (req, res) => BookmarkController.bookmarkDao.createBookmark(req.params.uid, req.params.tid).then(result => res.json(result));
        /**
         * Deletes the existing bookmark based on the user uid and the tuit tid.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the bookmarked tuit, and uid representing user who
         * bookmarked the tuit.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object with delete count
         */
        this.deleteBookmark = (req, res) => BookmarkController.bookmarkDao.deleteBookmark(req.params.uid, req.params.tid).then(result => res.json(result));
        /**
         * List all the bookmarks for a specific user.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing user who want to see the bookmarks list.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the bookmark objects
         */
        this.listBookmarks = (req, res) => BookmarkController.bookmarkDao.listBookmarks(req.params.uid).then(result => res.json(result));
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
/**
 * Creates singleton controller instance for bookmarks.
 *
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.createBookmark);
        app.delete("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.deleteBookmark);
        app.get("/users/:uid/bookmarks", BookmarkController.bookmarkController.listBookmarks);
    }
    return BookmarkController.bookmarkController;
};
