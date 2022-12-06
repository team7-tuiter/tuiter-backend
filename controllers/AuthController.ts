import AuthControllerI from "../interfaces/AuthController";
import { Express, Request, Response } from "express";
import UserDao from "../daos/UserDao";
import admin from 'firebase-admin';
import User from "../models/User";
import axios from "axios";
const FIREBASE_API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.SKEY}`;

/**
 * @class AuthController Implements RESTful Web service API for 
 * auth related features like signup, signin and loginas.
 * 
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /auth/signup to register a new user.</li>
 *     <li>POST /auth/login to login current user.</li>
 *     <li>POST /auth/loginas to login as different user.</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing likes User CRUD operations
 * @property {AuthController} authController Singleton controller implementing
 * RESTful Web service API
 */
export default class AuthController implements AuthControllerI {

  private static userDao: UserDao = new UserDao();
  private static authController: AuthController | null = null;

  public static getInstance = (app: Express): AuthController => {
    if (AuthController.authController === null) {
      AuthController.authController = new AuthController();
      app.post("/auth/signup", AuthController.authController.signUp);
      app.post("/auth/login", AuthController.authController.login);
      app.post("/auth/loginas", AuthController.authController.loginAs);
    }
    return AuthController.authController;
  }

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor() { }

  /**
   * Registers the new user in the database.
   * @param {Request} req Represents request from client, including the
   * username and password to login.
   * @param {Response} res Represents response to client, the current logged in object.
   */
  signUp = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      if (username && password) {
        let credential = await admin.auth().createUser({ email: `${username}@tuiter.com`, password: password });
        let token = await admin.auth().createCustomToken(credential.uid);
        let userObj = await AuthController.userDao.createUser({
          _id: credential.uid,
          username: username,
          password: password,
        } as User);
        // delete the password field, it should not go to client.
        delete userObj.password
        res.send({
          token: token,
          user: userObj,
        })
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
    }
  }

  /**
   * Logins the current user using username and password.
   * 
   * @param {Request} req Represents request from client, including the
   * username and password to login.
   * @param {Response} res Represents response to client, the current logged in object.
   */
  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      if (username && password) {
        const result = await axios.post(`${FIREBASE_API_URL}`, { email: `${username}@tuiter.com`, password: password });
        const credential = result.data;
        const userObj = await AuthController.userDao.findUserById(credential.localId);
        delete userObj.password;
        res.send({
          credential: credential,
          user: userObj,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
    }
  }

  /**
   * Login as some other user using username.
   * 
   * @param {Request} req Represents request from client, including the
   * username and password to login.
   * @param {Response} res Represents response to client, the current logged in object.
   */
  loginAs = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
      if (username) {
        const userObj = await AuthController.userDao.findUserByUsername(username)
        const result = await axios.post(`${FIREBASE_API_URL}`, { email: `${username}@tuiter.com`, password: userObj.password })
        const credential = result.data
        delete userObj.password
        res.send({
          credential: credential,
          user: userObj,
        })
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(403).send("Unauthorized");
    }
  }
}