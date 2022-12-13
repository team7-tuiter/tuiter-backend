import Chat from "../models/Chat";

/**
 * An interface that provides common operations that
 * can be done on the chat collection.
 */
export default interface ChatDaoI {
  getAllChatsById(userId: String): Promise<Chat[]>
  deleteSingleChat(userId1: String, userId2: String): Promise<any>
  createChat(chat: Chat): Promise<Chat>
  getAllMessagesInSingleChat(userId1: String, userId2: String): Promise<any>
  deleteSingleMessage(userId1: String, userId2: String, messageId: String): Promise<any>
  lastMessages(userId: String): Promise<any>
  sendMessage(userId1: String, userId2: String, message: String): Promise<any>;
}
