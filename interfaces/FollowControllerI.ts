import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to Follow user CRUD operations.
 */
export default interface FollowControllerI {
  followUser(req: Request, res: Response): void;
  unfollowUser(req: Request, res: Response): void;
  listUserFollowers(req: Request, res: Response): void;
  listUserFollowings(req: Request, res: Response): void;
};