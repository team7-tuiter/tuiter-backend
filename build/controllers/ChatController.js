"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatDao_1 = __importDefault(require("../daos/ChatDao"));
class ChatController {
    getAllChatsById(req, res) {
        ChatController.chatDao.getAllChatsById(req.params.uid).then(result => res.json(result));
    }
    deleteSingleChat(req, res) {
        ChatController.chatDao.deleteSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    getSingleChat(req, res) {
        ChatController.chatDao.getSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    createChat(req, res) {
        ChatController.chatDao.createChat(req.body).then(result => res.json(result));
    }
}
exports.default = ChatController;
ChatController.chatDao = ChatDao_1.default.getInstance();
ChatController.chatController = null;
ChatController.getInstance = (app) => {
    if (ChatController.chatController === null) {
        ChatController.chatController = new ChatController();
        app.get("/users/:uid/chats", ChatController.chatController.getAllChatsById);
        app.delete("/users/:uid1/users/:uid2/chat", ChatController.chatController.deleteSingleChat);
        app.get("/users/:uid1/users/:uid2/chat", ChatController.chatController.getSingleChat);
        app.post("/chat", ChatController.chatController.createChat);
    }
    return ChatController.chatController;
};
