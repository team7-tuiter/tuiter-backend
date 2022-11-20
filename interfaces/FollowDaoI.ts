import Follow from "../models/Follow";
import User from "../models/User";

/**
 * An interface that provides common operations that
 * can be done on the follow collection.
 */
export default interface FollowDaoI {
  followUser(uid: String, tuid: string): Promise<Follow>;
  unfollowUser(uid: String, tuid: string): Promise<any>;
  listUserFollowers(uid: String): Promise<User[]>;
  listUserFollowings(uid: String): Promise<User[]>;
};