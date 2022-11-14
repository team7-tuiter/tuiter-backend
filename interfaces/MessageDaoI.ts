import Message from "../models/Message";

/**
 * An interface that provides common operations that
 * can be done on the messages collection.
 */
export default interface MessageDaoI {
  send(uid: String, tuid: string, message: String): Promise<Message>;
  deleteReceived(uid: String, mid: String): Promise<any>;
  listSentMessages(uid: String): Promise<Message[]>;
  listReceivedMessages(uid: String): Promise<Message[]>;
};