import Chat from "../models/Chat";

/**
 * An interface that provides common operations that
 * can be done on the chat collection.
 */
export default interface ChatDaoI {
    createChat(userId1: String, userId2: String, messages: Chat): Promise<Chat>;
    updateChat(userId1: String, userId2: String, messages: Chat): Promise<Chat>;
    getSingeChat(from: String, to: String): Promise<Chat>;
    getAllChatsById(id: String): Promise<Chat[]>;
    deleteSingleChat(from: String, to: String): Promise<any>;
};