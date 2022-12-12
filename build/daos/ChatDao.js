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
const ChatModel_1 = __importDefault(require("../mongoose/ChatModel"));
/**
 * @class The class which is responsible for CRUD operations for the Chat model.
 *
 * @property {ChatDao} chatDao Singleton DAO implementing chat CRUD operations
 */
class ChatDao {
    constructor() {
        /**
         * Fetches all chat objects where the user id provided is the sender.
         * @param userId The user id of the sender.
         * @returns A list of chat objects where the user id is the sender.
         */
        this.getAllChatsById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const chats = yield ChatModel_1.default.find({
                // check both userId1 and userId2 fields when making the query
                $or: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            });
            return chats;
        });
        /**
         * Deletes an existing chat in the database.
         *
         * @param userId1 smallest user id by string comparison.
         * @param userId2 largest user id by string comparison.
         * @returns The JSON object with delete count (response).
         */
        this.deleteSingleChat = (userId1, userId2) => __awaiter(this, void 0, void 0, function* () {
            const res = yield ChatModel_1.default.deleteOne({ userId1, userId2 });
            return res;
        });
        /**
         * Creates chat object in database.
         * @param chat chat object
         * @returns The newly created chat object.
         */
        this.createChat = (chat) => __awaiter(this, void 0, void 0, function* () {
            let chatModel = yield ChatModel_1.default.create(chat);
            chatModel = yield (yield (yield chatModel.populate('userId2'))
                .populate("userId1")).populate("messages.from");
            return chatModel;
        });
        /**
         * Gets all messages in single chat
         * @param userId1 largest user id by string comparison.
         * @param userId2 smallest user id by string comparison.
         * @returns List of message objects
         */
        this.getAllMessagesInSingleChat = (userId1, userId2) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield ChatModel_1.default.find({ userId1, userId2 }, { messages: 1 } // include the messages field
            );
            return messages;
        });
        /**
         * Send a message from one user to another
         * @param userId1 largest user id by string comparison.
         * @param userId2 smallest user id by string comparison.
         * @param message message object
         * @returns update status
         */
        this.sendMessage = (userId1, userId2, message) => __awaiter(this, void 0, void 0, function* () {
            return ChatModel_1.default.updateOne({ userId1, userId2 }, { $push: { messages: message } });
        });
        /**
         * Delete single message in a conversation
         * @param userId1 largest user id by string comparison.
         * @param userId2 smallest user id by string comparison.
         * @returns The JSON object with delete count (response).
         */
        this.deleteSingleMessage = (userId1, userId2, messageId) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.updateOne({ userId1, userId2 }, { $pull: { messages: { id: messageId } } });
        });
        /**
         * Fetches the last messages of the user.
         * @param userId the user id
         * @returns list of messages (last messages that appear in a users conversation)
         */
        this.lastMessages = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.find({
                // check both userId1 and userId2 fields when making the query
                $or: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            }, { messages: { $slice: -1 } })
                .populate('messages.from')
                .populate('messages.to')
                .populate('userId1')
                .populate('userId2');
        });
    }
}
exports.default = ChatDao;
ChatDao.chatDao = null;
/**
 * Creates singleton dao instance.
 *
 * @returns ChatDao
 */
ChatDao.getInstance = () => {
    if (ChatDao.chatDao === null) {
        ChatDao.chatDao = new ChatDao();
    }
    return ChatDao.chatDao;
};
