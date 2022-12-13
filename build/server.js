"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const ChatController_1 = __importDefault(require("./controllers/ChatController"));
require('dotenv').config();
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(require("./cs5500-team7-firebase-adminsdk-fkii9-8da2c9299b.json"))
});
const cors = require("cors");
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
const http = require('http');
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use(cors());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Welcome to Foundation of Software Engineering!!!!"));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
};
/**
 * Connect function tries to connect to the mongo database
 * on the specifed url. Prints success message on successful
 * connection.
 */
(0, mongoose_1.connect)("mongodb+srv://Team7:Team7@cluster0.yuc3of4.mongodb.net/?retryWrites=true&w=majority", options, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log("MongoDB connection successful");
});
// Create user dao, controller and add it to express app.
const userDao = new UserDao_1.default();
const userController = new UserController_1.default(app, userDao);
// Create tuit dao, controller and add it to express app.
const tuitDao = new TuitDao_1.default();
const tuitController = new TuitController_1.default(app, tuitDao);
// Create like dao, controller and add it to express app.
const likeController = LikeController_1.default.getInstance(app);
// Create follow dao, controller and add it to express app.
const followController = FollowController_1.default.getInstance(app);
// Create bookmarks dao, controller and add it to express app.
const bookmarkController = BookmarkController_1.default.getInstance(app);
// Create ChatController 
const chatController = ChatController_1.default.getInstance(app);
//const authController = AuthController.getInstance(app);
// server for socket io
const server = http.createServer(app);
// initialize messageController (socket connection)
const messageController = new MessageController_1.default(server, clientOrigin);
messageController.startSocketConn();
