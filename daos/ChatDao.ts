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
   * Creates chat object in database.
   *
   * @param userId1 The smallest user id.
   * @param userId2 The largest user id.
   * @param messages the Chat being recorded.
   * @returns The newly created chat object.
   */
  createChat = async ( chat: Chat ): Promise<Chat> => {
    return await ChatModel.create(chat);
  };

  /**
   * Updates the existing chat in the database.
   *
   * @param userId1 The smallest user id.
   * @param userId2 The largest user id.
   * @param message The new message in form of request body.
   * @returns The newly created chat object.
   */
  updateChat = async (
    userId1: String,
    userId2: String,
    message: string
  ): Promise<any> => {
    return await ChatModel.updateOne(
      { userId1, userId2 }, 
      { $push: { messages: message } }
    );
  };

  /**
   * Fetches the last message of the user.
   *
   * @param from the user id of the sender.
   * @returns a JSON object which consits of the latest message.
   */
  lastMessages = async (from: string): Promise<any> => {
    return await ChatModel.find({from}, { messages: { $slice: -1 } });
  };

  /**
   * Fetches a single chat object based on the user ids provided.
    *
    * @param from The user id of the sender.
    * @param to The user id of the receiver.
    * @returns The single chat object.
    */
  getSingleChat = async (from: String, to: String): Promise<any> => {
    return await ChatModel.find({ from, to }).populate("to");
  };

  /**
   * Fetches all chat objects where the user id provided is the sender.
   *
   * @param id The user id of the sender.
   * @returns A list of chat objects where the user id is the sender.
   */
  getAllChatsById = async (id: String): Promise<Chat[]> => {
    const chats = await ChatModel.find({ "messages.from": id }).populate("to");
    return chats
  };

  /**
   * Deletes an existing chat in the database.
   *
   * @param from The user id of the sender.
   * @param to The user id of the receiver.
   * @returns The JSON object with delete count (response).
   */
  deleteSingleChat = async (from: String, to: String): Promise<any> => {
    return await ChatModel.deleteOne({
      "messages.from": from,
      "messages.to": to,
    });
  };

}
