import User from "./User";

/**
 * A tag class that represents model for Tuit tag.
 * Any tuit can be tagged with this multiple tags.
 * 
 * @property {String} name The name of the tag.
 * @property {Date} postedOn The date on which it was first posted on.
 * @property {User} postedBy The user who has created this tag.
 * 
 * @see User
 */
export default interface Tag {
  name: string;
  postedOn: Date;
  postedBy: User;
}