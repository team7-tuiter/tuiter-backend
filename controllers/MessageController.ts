// import MessageDao from "../daos/MessageDao";
import validateFirebaseToken from "../services/FirebaseAuthVerification";
const { Server } = require("socket.io")
import ChatDao from "../daos/ChatDao"
import ChatDaoI from "../interfaces/ChatDaoI"

export default class MessageController {

  // private messageDao: MessageDaoI = MessageDao.getInstance();
  private static chatDao: ChatDaoI = ChatDao.getInstance();
  private static server: any;
  private clientOrigin: string;

  public constructor(server: any, clientOrigin: string) {
    MessageController.server = server
    this.clientOrigin = clientOrigin
  }

  startSocketConn() {
    const io = new Server(MessageController.server, {
      cors: {
        origin: this.clientOrigin,
        methods: ["GET", "POST"],
      },
    })
    io.use(async (socket: any, next: any) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        const uid = await validateFirebaseToken(socket.handshake.query.token);
        if (uid) {
          // add uid to session and go next
          socket.session = { uid };
          next();
        } else {
          next(new Error('Authentication error'));
        }
      } else {
        next(new Error('Authentication error'));
      }
    });

    io.on("connection", (socket: any) => {

      console.log(`User Connected: ${socket.session.uid}`)

      socket.on("join_room", (data: any) => {
        const uid = socket.session['uid']
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
      })

      socket.on("send_message", (data: any) => {
        socket.to(data.room).emit("receive_message", data);
        MessageController.chatDao.sendMessage(data.userId1, data.userId2, data.messages)
      })

      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      })

    })

    /*
    * Start a server listening at port 4000 locally
    * but use environment variable PORT on Heroku if available.
    */
    const PORT = process.env.PORT || 4000;
    MessageController.server.listen(PORT);
    console.log("Server listening on port:", PORT)
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
