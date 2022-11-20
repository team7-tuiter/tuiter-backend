import { Date } from "mongoose";
import User from "./User";

/**
 * A message model interface that defines single message
 * object that is sent to another user privately. The message
 * must be present to be saved in the database.
 * 
 * @property {String} message The message that is being sent.
 * @property {User} to The luser who is receiving that message.
 * @property {User} from The luser who is sending that message.
 * @property {Date} sentOn The date on which it's being sent.
 * 
 * @see User
 */
export default interface Message {
  message: String,
  to: User,
  from: User,
  sentOn: Date
};