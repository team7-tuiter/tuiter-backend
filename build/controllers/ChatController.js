"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatDao_1 = __importDefault(require("../daos/ChatDao"));
/**
 * @class ChatController Implements RESTful Web service API for
 * follow CRUD operations on users chat functionality.
 *
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/chats to retrieve all chats that a user have.
 *     </li>
 *     <li>GET /users/:uid1/users/:uid2/chat to retrieve all the chat messages from single chat with another user.
 *     </li>
 *     <li>POST /chat to create a new chat.
 *     </li>
 *     <li>DELETE /users/:uid1/users/:uid2/chat to delete a chat from the database.
 *    </li>
 * </ul>
 * @property {ChatDao} chatDao Singleton DAO implementing chat CRUD operations
 * @property {ChatController} chatController Singleton controller implementing
 * RESTful Web service API
 */
class ChatController {
    /**
   * Gets all chats from the database with the id provided.
   * @param {Request} req Represents request from client, including any parameters needed.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON Object containing the chat objects
   */
    getAllChatsById(req, res) {
        ChatController.chatDao.getAllChatsById(req.params.uid).then(result => res.json(result));
    }
    /**
     * Get the last messages in a user's chats
     * @param req Represents request from client, including the user id.
     * @param res Represents response to client, including the
     * body formatted as JSON Object containing the message objects
     */
    lastMessages(req, res) {
        ChatController.chatDao.lastMessages(req.params.uid).then(result => res.json(result));
    }
    /**
   * Deletes a chat from the database with the id provided.
   *
   * @param {Request} req Represents request from client, including the parameters needed for deletion.
   * @param {Response} res Represents response to client, the status of the deletion.
   */
    deleteSingleChat(req, res) {
        ChatController.chatDao.deleteSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    /**
   * Creates a chat in the database with the body provided.
   *
   * @param {Request} req Represents request from client, including the chat object as part of the body.
   * @param {Response} res Represents response to client, JSON object of the newly created chat.
   */
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId1 = req.body.userId1;
            const userId2 = req.body.userId2;
            const doesChatExist = yield ChatController.chatDao.getAllMessagesInSingleChat(userId1, userId2);
            if (Array.isArray(doesChatExist) && doesChatExist.length === 0) {
                ChatController.chatDao.createChat(req.body).then(result => res.json(result));
            }
        });
    }
    /**
   * Gets a chat object from the database including all messages.
   *
   * @param {Request} req Represents request from client, including the parameters needed for retrieving the chat (userId1 and userId2).
   * @param {Response} res Represents response to client, JSON chat object containing all of the messages within the chat.
   */
    getAllMessagesInSingleChat(req, res) {
        ChatController.chatDao.getAllMessagesInSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    /**
   * Deletes a single message from the chat object in the database with the message id provided.
   *
   * @param {Request} req Represents request from client, including the parameters needed for deletion (the message id).
   * @param {Response} res Represents response to client, the status of the deletion.
   */
    deleteSingleMessage(req, res) {
        ChatController.chatDao.deleteSingleMessage(req.params.uid1, req.params.uid2, req.params.messageId).then(result => res.json(result));
    }
}
exports.default = ChatController;
ChatController.chatDao = ChatDao_1.default.getInstance();
ChatController.chatController = null;
/**
* Creates singleton controller instance for chat schema.
*
* @param {Express} app Express instance to declare the RESTful Web service
* API
* @return ChatController
*/
ChatController.getInstance = (app) => {
    if (ChatController.chatController === null) {
        ChatController.chatController = new ChatController();
        app.get("/users/:uid/chats", ChatController.chatController.getAllChatsById);
        app.get("/users/:uid/chats/last", ChatController.chatController.lastMessages);
        app.delete("/users/:uid1/users/:uid2/chat", ChatController.chatController.deleteSingleChat);
        app.post("/chat", ChatController.chatController.createChat);
        app.get("/users/:uid1/users/:uid2/chat", ChatController.chatController.getAllMessagesInSingleChat);
        app.delete("/users/:uid1/users/:uid2/chat/:messageId", ChatController.chatController.deleteSingleMessage);
    }
    return ChatController.chatController;
};
