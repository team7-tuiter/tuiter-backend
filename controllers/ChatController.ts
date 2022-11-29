import { application, Express, Request, Response } from "express";
import ChatDao from "../daos/ChatDao";
import ChatControllerI from "../interfaces/ChatControllerI";
import ChatDaoI from "../interfaces/ChatDaoI";

export default class ChatController implements ChatControllerI {
    private static chatDao: ChatDaoI = ChatDao.getInstance();
    private static chatController: ChatController | null = null;

    public static getInstance = (app: Express): ChatController => {
        if (ChatController.chatController === null) {
            ChatController.chatController = new ChatController();
            app.get("api/users/:uid/chats", ChatController.chatController.getAllChatsById);
            app.delete("api/users/:uid1/users/:uid2/chat", ChatController.chatController.deleteSingleChat);
            app.get("api/users/:uid1/users/:uid2/chat", ChatController.chatController.getSingleChat);
        }
        return ChatController.chatController;
    }

    getAllChatsById(req: Request, res: Response): void {
        ChatController.chatDao.getAllChatsById(req.params.uid).then(result => res.json(result));
    }

    deleteSingleChat(req: Request, res: Response): void {
        //Need to order uid1 and uid2 if not done on frontend
        ChatController.chatDao.deleteSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    
    getSingleChat(req: Request, res: Response): void {
        ChatController.chatDao.getSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    
}