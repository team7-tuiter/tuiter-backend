import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import User from "../models/User";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class The class which is responsible for CRUD operations
 * for the users follow model.
 * 
 * @property {FollowDao} followDao Singleton DAO implementing likes 
 * CRUD operations
 */
export default class FollowDao implements FollowDaoI {
  private static followDao: FollowDao | null = null;

  /**
   * Creates singleton dao instance.
   * 
   * @return FollowDao
   */
  public static getInstance = (): FollowDao => {
    if (FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  }

  private constructor() { }

  /**
   * Creates a new entry in the follow table.
   * 
   * @param uid The user who is following
   * @param tuid The user who is being followed
   * @returns Follow object
   */
  followUser = async (uid: String, tuid: string): Promise<Follow> => {
    return await FollowModel.create({ followedBy: uid, following: tuid });
  }

  /**
   * Unfollows the existing user which is being followed.
   * 
   * @param uid The user who is trying to unfollow
   * @param tuid The target user which is being unfollowed
   * @returns The json object with delete count.
   */
  unfollowUser = async (uid: String, tuid: string): Promise<any> => {
    return await FollowModel.deleteOne({ followedBy: uid, following: tuid });
  }

  /**
   * List the followers of the user.
   * 
   * @param uid The user id for which the follower needs to be listed
   * @returns JSON Array of the follow objects populated with user.
   */
  listUserFollowers = async (uid: String): Promise<User[]> => {
    return await FollowModel.find({ following: uid }).select("followedBy").populate('followedBy');
  }

  /**
   * List the users whom i am following.
   * 
   * @param uid The user id of the user.
   * @returns JSON Array of the follow objects populated with user.
   */
  listUserFollowings = async (uid: String): Promise<User[]> => {
    return await FollowModel.find({ followedBy: uid }).select("following").populate('following');
  }
}