import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to tuit CRUD operations.
 */
export default interface TuitControllerI {
  findAllTuits(req: Request, res: Response): void;
  findTuitById(req: Request, res: Response): void;
  findTuitsByUser(req: Request, res: Response): void;
  createTuit(req: Request, res: Response): void;
  updateTuit(req: Request, res: Response): void;
  deleteTuit(req: Request, res: Response): void;
}

