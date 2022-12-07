/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import BookmarkController from "./controllers/BookmarkController";
import FollowController from "./controllers/FollowController";
import LikeController from "./controllers/LikeController";
import MessageController from "./controllers/MessageController";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
import ChatController from "./controllers/ChatController";
import AuthController from "./controllers/AuthController";

import admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.cert(require("./cs5500-team7-firebase-adminsdk-fkii9-8da2c9299b.json"))
});
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const http = require('http')
const clientOrigin = "http://localhost:3000"


app.use(cors());
app.use(express.json({ limit: "50mb" }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
connect(
  "mongodb+srv://Team7:Team7@cluster0.yuc3of4.mongodb.net/?retryWrites=true&w=majority",
  options,
  (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log("MongoDB connection successful");
  }
);

// Create user dao, controller and add it to express app.
const userDao = new UserDao();
const userController = new UserController(app, userDao);

// Create tuit dao, controller and add it to express app.
const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);

// Create like dao, controller and add it to express app.
const likeController = LikeController.getInstance(app);

// Create follow dao, controller and add it to express app.
const followController = FollowController.getInstance(app);

// Create bookmarks dao, controller and add it to express app.
const bookmarkController = BookmarkController.getInstance(app);

// Create ChatController 
const chatController = ChatController.getInstance(app)

//const authController = AuthController.getInstance(app);

// server for socket io
const server = http.createServer(app)

// initialize messageController (socket connection)
const messageController = new MessageController(server, clientOrigin);
messageController.startSocketConn()
