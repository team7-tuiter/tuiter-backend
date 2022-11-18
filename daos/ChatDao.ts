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
    }

    /**
     * Creates chat object in database.
     * 
     * @param userId1 The smallest user id.
     * @param userId2 The largest user id.
     * @param messages the Chat being recorded.
     * @returns The newly created chat object.
     */
    createChat = async (userId1: String, userId2: String, messages: Chat): Promise<Chat> => {
        return await ChatModel.create({ userId1, userId2, messages });
    }

    /**
     * Updates the existing chat in the database.
     * 
     * @param userId1 The smallest user id.
     * @param userId2 The largest user id.
     * @param messages The new chat in form of request body.
     * @returns The newly created chat object.
     */
    updateChat = async (userId1: String, userId2: String, messages: Chat): Promise<any> => {
        return await ChatModel.updateOne({ userId1, userId2 }, { $set: messages });
    }

    /**
     * Fetches a single chat object based on the user ids provided.
     * 
     * @param from The user id of the sender.
     * @param to The user id of the receiver.
     * @returns The single chat object.
     */
    getSingleChat = async (from: String, to: String): Promise<any> => {
        return await ChatModel.find({ from, to }).populate("to");
    }

    /**
     * Fetches all chat objects where the user id provided is the sender.
     * 
     * @param id The user id of the sender.
     * @returns A list of chat objects where the user id is the sender.
     */
    getAllChatsById = async (id: String): Promise<Chat[]> => {
        return await ChatModel.find({ "messages.from": id }).populate("to");
    }


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
            "messages.to": to 
        });
    }

}