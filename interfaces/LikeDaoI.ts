import Like from "../models/Likes";

/**
 * An interface that provides common operations that
 * can be done on the likes collection.
 */
export default interface LikeDaoI {
  findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
  findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
  userUnlikesTuit(tid: string, uid: string): Promise<any>;
  userLikesTuit(tid: string, uid: string): Promise<Like>;
};