"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const axios_1 = __importDefault(require("axios"));
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
 * @property {AuthController} authController Singleton controller implementing RESTful Web service API
 * @deprecated
 */
class AuthController {
    /**
     * Private constructor because we want singleton pattern to be used
     * for creating object of this class.
     */
    constructor() {
        /**
         * Registers the new user in the database.
         * @param {Request} req Represents request from client, including the
         * username and password to login.
         * @param {Response} res Represents response to client, the current logged in object.
         */
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                if (username && password) {
                    let credential = yield firebase_admin_1.default.auth().createUser({ email: `${username}@tuiter.com`, password: password });
                    let token = yield firebase_admin_1.default.auth().createCustomToken(credential.uid);
                    let userObj = yield AuthController.userDao.createUser({
                        _id: credential.uid,
                        username: username,
                        password: password,
                    });
                    // delete the password field, it should not go to client.
                    delete userObj.password;
                    res.send({
                        token: token,
                        user: userObj,
                    });
                }
                else {
                    throw new Error();
                }
            }
            catch (error) {
                res.status(401).send("Unauthorized");
            }
        });
        /**
         * Logins the current user using username and password.
         *
         * @param {Request} req Represents request from client, including the
         * username and password to login.
         * @param {Response} res Represents response to client, the current logged in object.
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                if (username && password) {
                    const result = yield axios_1.default.post(`${FIREBASE_API_URL}`, { email: `${username}@tuiter.com`, password: password });
                    const credential = result.data;
                    const userObj = yield AuthController.userDao.findUserById(credential.localId);
                    delete userObj.password;
                    res.send({
                        credential: credential,
                        user: userObj,
                    });
                }
                else {
                    throw new Error();
                }
            }
            catch (error) {
                res.status(403).send("Unauthorized");
            }
        });
        /**
         * Login as some other user using username.
         *
         * @param {Request} req Represents request from client, including the
         * username and password to login.
         * @param {Response} res Represents response to client, the current logged in object.
         */
        this.loginAs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            try {
                if (username) {
                    const userObj = yield AuthController.userDao.findUserByUsername(username);
                    const result = yield axios_1.default.post(`${FIREBASE_API_URL}`, { email: `${username}@tuiter.com`, password: userObj.password });
                    const credential = result.data;
                    delete userObj.password;
                    res.send({
                        credential: credential,
                        user: userObj,
                    });
                }
                else {
                    throw new Error();
                }
            }
            catch (error) {
                res.status(403).send("Unauthorized");
            }
        });
    }
}
exports.default = AuthController;
AuthController.userDao = new UserDao_1.default();
AuthController.authController = null;
AuthController.getInstance = (app) => {
    if (AuthController.authController === null) {
        AuthController.authController = new AuthController();
        app.post("/auth/signup", AuthController.authController.signUp);
        app.post("/auth/login", AuthController.authController.login);
        app.post("/auth/loginas", AuthController.authController.loginAs);
    }
    return AuthController.authController;
};
