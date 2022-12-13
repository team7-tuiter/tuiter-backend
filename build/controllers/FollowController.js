"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful Web service API for
 * follow CRUD operations on users follow list.
 *
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/followers to retrieve all followers that a user have.
 *     </li>
 *     <li>GET /users/:uid/following to retrieve all the users who are following
 *     this particular user.
 *     </li>
 *     <li>POST /users/:uid/following/:tuid to follow a new user.
 *     </li>
 *     <li>DELETE /users/:uid/following/:tuid to delete that a user is no longer
 *      following that user.
 *    </li>
 * </ul>
 * @property {FollowDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    /**
     * Private constructor because we want singleton pattern to be used
     * for creating object of this class.
     */
    constructor() {
        /**
         * Creates a new entry in the follows table that represents a user is following
         * another user.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user who is going to follow user represented
         * with tuid.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object containing the user object
         */
        this.followUser = (req, res) => FollowController.followDao.followUser(req.params.uid, req.params.tuid).then(result => res.json(result));
        /**
         * Removes an existing entry in the follows table that represents a user is following
         * another user.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user who was following user represented
         * with tuid.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object with delete count.
         */
        this.unfollowUser = (req, res) => FollowController.followDao.unfollowUser(req.params.uid, req.params.tuid).then(result => res.json(result));
        /**
         * List all the followers of the specific user identified by path param
         * uid.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter uid for which all the followers needs to be shown.
         *
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.listUserFollowers = (req, res) => FollowController.followDao.listUserFollowers(req.params.uid).then(result => res.json(result));
        /**
         * List all the users whom I'm following, I'm is identified by the path
         * param uid.
         *
         * @param {Request} req Represents request from client, including the path
         * parameter uid for which all the users whom i am following needs to be listed.
         *
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects.
         */
        this.listUserFollowings = (req, res) => FollowController.followDao.listUserFollowings(req.params.uid).then(result => res.json(result));
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
 * Creates singleton controller instance for follow schema.
 *
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.post("/users/:uid/following/:tuid", FollowController.followController.followUser);
        app.delete("/users/:uid/following/:tuid", FollowController.followController.unfollowUser);
        app.get("/users/:uid/followers", FollowController.followController.listUserFollowers);
        app.get("/users/:uid/following", FollowController.followController.listUserFollowings);
    }
    return FollowController.followController;
};
