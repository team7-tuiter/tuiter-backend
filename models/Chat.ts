import { Date, DateSchemaDefinition } from "mongoose";
import MessageType from "./Type";
import User from "./User";

/**
 * A chat model interface that defines single chat
 * object. The message contents
 * must be present to be saved in the database.
 * 
 * @property {String} message The message that is being sent.
 * @property {User} to The luser who is receiving that message.
 * @property {User} from The luser who is sending that message.
 * @property {Date} sentOn The date on which it's being sent.
 * 
 * @see User
 */
export default interface Chat {
  userId1: User,
  userId2: User,
  messages: [{
    id: String,
    from: User,
    to: User,
    type: MessageType,
    message: String,
    sentOn: Date
  }]
};