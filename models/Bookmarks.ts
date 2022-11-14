import Tuit from "./Tuit";
import User from "./User";

/**
 * A bookmark model that sets the relationship between
 * User and the Tuit, as a Bookmmark. User can save
 * as many bookmarks as they want.
 * 
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 * 
 * @see User
 * @see Tuit
 */
export default interface Bookmarks {
  bookmarkedTuit: Tuit,
  bookmarkedBy: User
};