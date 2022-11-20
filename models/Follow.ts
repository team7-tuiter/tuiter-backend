import User from "./User";

/**
 * A follow model that sets the relationship between
 * User as each other followers. User can follow any 
 * registered User and also unfollow them.
 * 
 * @property {User} followedBy The user that is following another user.
 * @property {User} following The user being followed.
 * 
 * @see User
 */
export default interface Follow {
  followedBy: User,
  following: User
};