import { Express, Request, Response } from "express";
import ChatDao from "../daos/ChatDao";
import ChatControllerI from "../interfaces/ChatControllerI";
import ChatDaoI from "../interfaces/ChatDaoI";

export default class ChatController implements ChatControllerI {
    private static chatDao: ChatDaoI = ChatDao.getInstance();
    private static chatController: ChatController | null = null;

    public static getInstance = (app: Express): ChatController => {
        if (ChatController.chatController === null) {
            ChatController.chatController = new ChatController();
            app.get("/users/:uid/chats", ChatController.chatController.getAllChatsById);
            app.delete("/users/:uid1/users/:uid2/chat", ChatController.chatController.deleteSingleChat);
            app.post("/chat", ChatController.chatController.createChat);
            app.get("/users/:uid1/users/:uid2/chat", ChatController.chatController.getAllMessagesInSingleChat);
            app.delete("/users/:uid1/users/:uid2/chat/:messageId", ChatController.chatController.deleteSingleMessage);
        }
        return ChatController.chatController;
    }

    getAllChatsById(req: Request, res: Response): void {
        ChatController.chatDao.getAllChatsById(req.params.uid).then(result => res.json(result));
    }

    deleteSingleChat(req: Request, res: Response): void {
        ChatController.chatDao.deleteSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    
    createChat(req: Request, res: Response): void {
        ChatController.chatDao.createChat(req.body).then(result => res.json(result))
    }

    getAllMessagesInSingleChat(req: Request, res: Response): void {
        ChatController.chatDao.getAllMessagesInSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }

    deleteSingleMessage(req: Request, res: Response): void {
        ChatController.chatDao.deleteSingleMessage(req.params.uid1, req.params.uid2, req.params.messageId).then(result => res.json(result));
    }

    







    
}