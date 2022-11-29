import { Request, Response } from "express";

export default interface ChatControllerI {
    getAllChatsById(req: Request, res: Response): void;
    deleteSingleChat(req: Request, res: Response): void;
}