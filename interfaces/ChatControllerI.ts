import { Request, Response } from "express";

/**
 * An interface that provides common operations that
 * can be done on the chat collection.
 */
export default interface ChatControllerI {
    getAllChatsById(req: Request, res: Response): void;
    deleteSingleChat(req: Request, res: Response): void;
    createChat(req: Request, res: Response): void;
    getAllMessagesInSingleChat(req: Request, res: Response): void;
    deleteSingleMessage(req: Request, res: Response): void;
    lastMessages(req: Request, res: Response): void;
}