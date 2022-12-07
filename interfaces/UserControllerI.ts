import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to user CRUD operations.
 */
export default interface UserController {
  findAllUsers(req: Request, res: Response): void;
  findUserById(req: Request, res: Response): void;
  createUser(req: Request, res: Response): void;
  deleteUser(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
  searchUser(req: Request, res: Response): void;
}

