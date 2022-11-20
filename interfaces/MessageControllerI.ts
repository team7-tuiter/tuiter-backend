import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to message user CRUD operations.
 */
export default interface MessageControllerI {
  send(req: Request, res: Response): void;
  deleteReceived(req: Request, res: Response): void;
  listSentMessages(req: Request, res: Response): void;
  listReceivedMessages(req: Request, res: Response): void;
};