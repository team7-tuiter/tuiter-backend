import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to Like Tuit CRUD operations.
 */
export default interface LikeControllerI {
  findAllUsersThatLikedTuit(req: Request, res: Response): void;
  findAllTuitsLikedByUser(req: Request, res: Response): void;
  userLikesTuit(req: Request, res: Response): void;
  userUnlikesTuit(req: Request, res: Response): void;
};