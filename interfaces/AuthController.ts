import { Request, Response } from "express";

/**
 * An controller interface that register url patterns of
 * APIs related to Authentication.
 */
export default interface AuthControllerI {
  signUp(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
  loginAs(req: Request, res: Response): void;
};