import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to Bookmark CRUD operations.
 */
export default interface BookmarkControllerI {
  createBookmark(req: Request, res: Response): void;
  deleteBookmark(req: Request, res: Response): void;
  listBookmarks(req: Request, res: Response): void;
};