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
            app.get("/users/:uid1/users/:uid2/chat", ChatController.chatController.getSingleChat);
            app.post("/chat", ChatController.chatController.createChat);
            app.put("/users/:uid1/users/:uid2/chat", ChatController.chatController.updateChat);
        }
        return ChatController.chatController;
    }

    getAllChatsById(req: Request, res: Response): void {
        ChatController.chatDao.getAllChatsById(req.params.uid).then(result => res.json(result));
    }

    deleteSingleChat(req: Request, res: Response): void {
        ChatController.chatDao.deleteSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }
    
    getSingleChat(req: Request, res: Response): void {
        ChatController.chatDao.getSingleChat(req.params.uid1, req.params.uid2).then(result => res.json(result));
    }

    createChat(req: Request, res: Response): void {
        ChatController.chatDao.createChat(req.body).then(result => res.json(result))
    }

    updateChat(req: Request, res: Response): void {
        ChatController.chatDao.updateChat(req.params.uid1, req.params.uid2, req.body).then(result => res.json(result))
    }

    
}