import Chat from "../models/Chat";

/**
 * An interface that provides common operations that
 * can be done on the chat collection.
 */
export default interface ChatDaoI {
  createChat(chat: Chat): Promise<Chat>;
  updateChat(userId1: String, userId2: String, message: Chat): Promise<any>;
  getSingleChat(from: String, to: String): Promise<any>;
  getAllChatsById(id: String): Promise<Chat[]>;
  deleteSingleChat(from: String, to: String): Promise<any>;
  lastMessages(from: String, to: String): Promise<any>;
}
