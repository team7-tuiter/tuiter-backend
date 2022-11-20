import User from "./User";

/**
 * The model class that defines Topic which can be used
 * to attached on the Tuit. Topics are like category
 * for a tuit. User can also see tuits belonging to certain
 * topic.
 * 
 * @property {String} name The name of the topic.
 * @property {Date} postedOn The date on which it was first posted on.
 * @property {User} postedBy The user who has created this topic.
 * 
 * @see User
 */
export default interface Topic {
  name: string;
  postedOn: Date;
  postedBy: User;
}