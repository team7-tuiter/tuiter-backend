import { Request, Response } from "express";

export default interface ChatControllerI {
    getAllChatsById(req: Request, res: Response): void;
    deleteSingleChat(req: Request, res: Response): void;
    createChat(req: Request, res: Response): void;
    getAllMessagesInSingleChat(req: Request, res: Response): void;
    deleteSingleMessage(req: Request, res: Response): void;
}