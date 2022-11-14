import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Likes";
import LikeModel from "../mongoose/LikeModel";

/**
 * @class The class which is responsible for CRUD operations
 * for the likes model.
 * 
 * @property {LikeDao} likeDao Singleton DAO implementing likes 
 * CRUD operations
 */
export default class LikeDao implements LikeDaoI {
  private static likeDao: LikeDao | null = null;

  /**
   * Creates singleton dao instance.
   * 
   * @return FollowDao
   */
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  }
  private constructor() { }

  /**
   * Finds all the users who liked a specific tuit.
   * 
   * @param tid The tuit id for which users needs to fetched.
   * @returns The array of like objects populated with user object.
   * 
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel
      .find({ tuit: tid })
      .populate("likedBy")
      .exec();

  /**
   * Find all the tuits that is liked by a user.
   * 
   * @param uid The userid for which the all tuits needs to be fetched.
   * @returns Array of like object populated with tuit object.
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel
      .find({ likedBy: uid })
      .populate("tuit")
      .exec();

  /**
   * Saves an entry of a user liking a tuit.
   * 
   * @param uid The userid who is liking the tuit.
   * @param tid The tuit being liked.
   * @returns the like object.
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Removes the entry of user liking a tuit.
   * @param uid The user who is liking the tuit.
   * @param tid The tuit id that is being unliked.
   * @returns Json object with delete count
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}