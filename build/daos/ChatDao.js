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
         * Creates chat object in database.
         *
         * @param userId1 The smallest user id.
         * @param userId2 The largest user id.
         * @param messages the Chat being recorded.
         * @returns The newly created chat object.
         */
        this.createChat = (chat) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.create(chat);
        });
        /**
         * Updates the existing chat in the database.
         *
         * @param userId1 The smallest user id.
         * @param userId2 The largest user id.
         * @param message The new message in form of request body.
         * @returns The newly created chat object.
         */
        this.updateChat = (userId1, userId2, message) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.updateOne({ userId1, userId2 }, { $push: { messages: message } });
        });
        /**
         * Fetches the last message of the user.
         *
         * @param from the user id of the sender.
         * @returns a JSON object which consits of the latest message.
         */
        this.lastMessages = (from) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.find({ from }, { messages: { $slice: -1 } });
        });
        /**
         * Fetches a single chat object based on the user ids provided.
          *
          * @param from The user id of the sender.
          * @param to The user id of the receiver.
          * @returns The single chat object.
          */
        this.getSingleChat = (from, to) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.find({ from, to }).populate("to");
        });
        /**
         * Fetches all chat objects where the user id provided is the sender.
         *
         * @param id The user id of the sender.
         * @returns A list of chat objects where the user id is the sender.
         */
        this.getAllChatsById = (id) => __awaiter(this, void 0, void 0, function* () {
            const chats = yield ChatModel_1.default.find({ "messages.from": id }).populate("to");
            return chats;
        });
        /**
         * Deletes an existing chat in the database.
         *
         * @param from The user id of the sender.
         * @param to The user id of the receiver.
         * @returns The JSON object with delete count (response).
         */
        this.deleteSingleChat = (from, to) => __awaiter(this, void 0, void 0, function* () {
            return yield ChatModel_1.default.deleteOne({
                "messages.from": from,
                "messages.to": to,
            });
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
