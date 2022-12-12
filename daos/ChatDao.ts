import ChatDaoI from "../interfaces/ChatDaoI";
import Chat from "../models/Chat";
import ChatModel from "../mongoose/ChatModel";

/**
 * @class The class which is responsible for CRUD operations for the Chat model.
 *
 * @property {ChatDao} chatDao Singleton DAO implementing chat CRUD operations
 */
export default class ChatDao implements ChatDaoI {
  private static chatDao: ChatDao | null = null;

  /**
   * Creates singleton dao instance.
   *
   * @returns ChatDao
   */
  public static getInstance = (): ChatDao => {
    if (ChatDao.chatDao === null) {
      ChatDao.chatDao = new ChatDao();
    }
    return ChatDao.chatDao;
  };

  /**
   * Fetches all chat objects where the user id provided is the sender.
   * @param userId The user id of the sender.
   * @returns A list of chat objects where the user id is the sender.
   */
  getAllChatsById = async (userId: String): Promise<Chat[]> => {
    const chats = await ChatModel.find({
      // check both userId1 and userId2 fields when making the query
      $or: [
        { userId1: userId },
        { userId2: userId }
      ]
    })
    return chats
  }

  /**
   * Deletes an existing chat in the database.
   *
   * @param userId1 smallest user id by string comparison.
   * @param userId2 largest user id by string comparison.
   * @returns The JSON object with delete count (response).
   */
  deleteSingleChat = async (userId1: String, userId2: String): Promise<any> => {
    const res = await ChatModel.deleteOne({ userId1, userId2 })
    return res
  }

  /**
   * Creates chat object in database.
   * @param chat chat object
   * @returns The newly created chat object.
   */
  createChat = async (chat: Chat): Promise<Chat> => {
    let chatModel = await ChatModel.create(chat)
    chatModel = await (await (await chatModel.populate('userId2'))
      .populate("userId1")).populate("messages.from")
    return chatModel
  }

  /**
   * Gets all messages in single chat 
   * @param userId1 largest user id by string comparison.
   * @param userId2 smallest user id by string comparison.
   * @returns List of message objects
   */
  getAllMessagesInSingleChat = async (userId1: String, userId2: String): Promise<any> => {
    const messages =  await ChatModel.find(
      { userId1, userId2 }, 
      { messages : 1 } // include the messages field
    )
    return messages
  }

  /**
   * Send a message from one user to another
   * @param userId1 largest user id by string comparison.
   * @param userId2 smallest user id by string comparison.
   * @param message message object
   * @returns update status 
   */
  sendMessage = async (userId1: String, userId2: String, message: any): Promise<any> => {
    return ChatModel.updateOne(
      { userId1, userId2 },
      { $push: { messages: message }}
    )
  }

  /**
   * Delete single message in a conversation
   * @param userId1 largest user id by string comparison.
   * @param userId2 smallest user id by string comparison.
   * @returns The JSON object with delete count (response).
   */
  deleteSingleMessage = async (userId1: String, userId2: String, messageId: String): Promise<any> => {
    return await ChatModel.updateOne(
      { userId1, userId2 }, 
      { $pull: { messages: { id: messageId } } })
  }

  /**
   * Fetches the last messages of the user.
   * @param userId the user id
   * @returns list of messages (last messages that appear in a users conversation)
   */
  lastMessages = async (userId: string): Promise<any> => {
    return await ChatModel.find({
      // check both userId1 and userId2 fields when making the query
      $or: [
        { userId1: userId },
        { userId2: userId }
      ]
      }, { messages: { $slice: -1 } })
      .populate('messages.from')
      .populate('messages.to')
      .populate('userId1')
      .populate('userId2')
  }

}
