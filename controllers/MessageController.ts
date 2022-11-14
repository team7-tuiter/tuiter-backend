import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDaoI from "../interfaces/MessageDaoI";


/**
 * @class MessageController Implements RESTful Web service API for 
 * message CRUD operations on collection messages.
 * 
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/messages/sent to retrieve all messages sent by the user.
 *     </li>
 *     <li>GET /users/:uid/messages/received to retrieve all message that a user received.
 *     </li>
 *     <li>POST /users/:uid/messages/sent/:tuid to save a new message sent to a user.
 *     </li>
 *     <li>DELETE /users/:uid/messages/received/:mid to delete that a user
 *     no longer needs a message that has been received and wants to delete it.</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDaoI = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

  /**
   * Creates singleton controller instance for messages.
   * 
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();
      app.post("/users/:uid/messages/sent/:tuid", MessageController.messageController.send);
      app.delete("/users/:uid/messages/received/:mid", MessageController.messageController.deleteReceived);
      app.get("/users/:uid/messages/sent", MessageController.messageController.listSentMessages);
      app.get("/users/:uid/messages/received", MessageController.messageController.listReceivedMessages);
    }
    return MessageController.messageController;
  }

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor() { }

  /**
   * Sends a new message to a user by creating a message entry in the collection
   * messages.
   * 
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user who is sending the message to a user
   * identified by path param tuid.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON object of the message saved.
   */
  send = (req: Request, res: Response) =>
    MessageController.messageDao.send(req.params.uid, req.params.tuid, req.body.message).then(result => res.json(result));

  /**
   * Deletes an existing received message for a user.
   * 
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user who wants to delete the received message
   * identified by mid.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON object of delete counts.
   */
  deleteReceived = (req: Request, res: Response) =>
    MessageController.messageDao.deleteReceived(req.params.uid, req.params.mid).then(result => res.json(result));

  /**
   * List all the sent messages by a specific user.
   * 
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user who wants to see his all sent messages.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON Array of message.
   */
  listSentMessages = (req: Request, res: Response) =>
    MessageController.messageDao.listSentMessages(req.params.uid).then(result => res.json(result));

  /**
   * List all the received messages for a specific user.
   * 
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user who wants to see his all received messages.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON Array of message.
   */
  listReceivedMessages = (req: Request, res: Response) =>
    MessageController.messageDao.listReceivedMessages(req.params.uid).then(result => res.json(result));
}