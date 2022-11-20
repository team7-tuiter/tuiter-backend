import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDaoI from "../interfaces/FollowDaoI";

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
export default class FollowController implements FollowControllerI {
  private static followDao: FollowDaoI = FollowDao.getInstance();
  private static followController: FollowController | null = null;

  /**
   * Creates singleton controller instance for follow schema.
   * 
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.post("/users/:uid/following/:tuid", FollowController.followController.followUser);
      app.delete("/users/:uid/following/:tuid", FollowController.followController.unfollowUser);
      app.get("/users/:uid/followers", FollowController.followController.listUserFollowers);
      app.get("/users/:uid/following", FollowController.followController.listUserFollowings);
    }
    return FollowController.followController;
  }

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor() { }

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
  followUser = (req: Request, res: Response) =>
    FollowController.followDao.followUser(req.params.uid, req.params.tuid).then(result => res.json(result));

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
  unfollowUser = (req: Request, res: Response) =>
    FollowController.followDao.unfollowUser(req.params.uid, req.params.tuid).then(result => res.json(result));

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
  listUserFollowers = (req: Request, res: Response) =>
    FollowController.followDao.listUserFollowers(req.params.uid).then(result => res.json(result));

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
  listUserFollowings = (req: Request, res: Response) =>
    FollowController.followDao.listUserFollowings(req.params.uid).then(result => res.json(result));
}