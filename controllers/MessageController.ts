import MessageDao from "../daos/MessageDao";
import MessageDaoI from "../interfaces/MessageDaoI";
const { Server } = require("socket.io")



export default class MessageController {
  private messageDao: MessageDaoI = MessageDao.getInstance();
  private server : any = null; 
  private clientOrigin: string = '';
  private io = new Server(this.server, {
    cors: {
      origin: this.clientOrigin,
      methods: ["GET", "POST"],
    },
  })


  public constructor(server: any, clientOrigin: string) {
      this.server = server 
      this.clientOrigin = clientOrigin
    }
  
  
  startSocketConn() {
    this.io.on("connection", (socket: any) => {

      console.log(`User Connected: ${socket.id}`);

      socket.on("join_room", (data: any) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      })
    
      socket.on("send_message", (data: any) => {
        socket.to(data.room).emit("receive_message", data);
        // this.messageDao.send(req.params.uid, req.params.tuid, req.body.message)
      })
    
      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      })

    })
  }
}












  // /**
  //  * Sends a new message to a user by creating a message entry in the collection
  //  * messages.
  //  * 
  //  * @param {Request} req Represents request from client, including the path
  //  * parameter uid representing the user who is sending the message to a user
  //  * identified by path param tuid.
  //  * @param {Response} res Represents response to client, including the
  //  * body formatted as JSON object of the message saved.
  //  */
  // send = (req: Request, res: Response) =>
  //   MessageController.messageDao.send(req.params.uid, req.params.tuid, req.body.message).then(result => res.json(result));

  // /**
  //  * Deletes an existing received message for a user.
  //  * 
  //  * @param {Request} req Represents request from client, including the path
  //  * parameter uid representing the user who wants to delete the received message
  //  * identified by mid.
  //  * @param {Response} res Represents response to client, including the
  //  * body formatted as JSON object of delete counts.
  //  */
  // deleteReceived = (req: Request, res: Response) =>
  //   MessageController.messageDao.deleteReceived(req.params.uid, req.params.mid).then(result => res.json(result));

  // /**
  //  * List all the sent messages by a specific user.
  //  * 
  //  * @param {Request} req Represents request from client, including the path
  //  * parameter uid representing the user who wants to see his all sent messages.
  //  * @param {Response} res Represents response to client, including the
  //  * body formatted as JSON Array of message.
  //  */
  // listSentMessages = (req: Request, res: Response) =>
  //   MessageController.messageDao.listSentMessages(req.params.uid).then(result => res.json(result));

  // /**
  //  * List all the received messages for a specific user.
  //  * 
  //  * @param {Request} req Represents request from client, including the path
  //  * parameter uid representing the user who wants to see his all received messages.
  //  * @param {Response} res Represents response to client, including the
  //  * body formatted as JSON Array of message.
  //  */
  // listReceivedMessages = (req: Request, res: Response) =>
  //   MessageController.messageDao.listReceivedMessages(req.params.uid).then(result => res.json(result));
