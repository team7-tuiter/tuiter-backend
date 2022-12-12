"use strict";
// import MessageDaoI from "../interfaces/MessageDaoI";
// import Message from "../models/Message";
// import MessageModel from "../mongoose/MessageModel";
// /**
//  * @class The class which is responsible for CRUD operations
//  * for the Message model.
//  * 
//  * @property {MessageDao} messageDao Singleton DAO implementing likes 
//  * CRUD operations
//  */
// export default class MessageDao implements MessageDaoI {
//   private static messageDao: MessageDao | null = null;
//   /**
//    * Creates singleton dao instance.
//    * 
//    * @return FollowDao
//    */
//   public static getInstance = (): MessageDao => {
//     if (MessageDao.messageDao === null) {
//       MessageDao.messageDao = new MessageDao();
//     }
//     return MessageDao.messageDao;
//   }
//   private constructor() { }
//   /**
//    * Deletes the received message for a user.
//    * @param uid The user id of the user.
//    * @param mid The message id being deleted.
//    * @returns The JSON object with delete count.
//    */
//   deleteReceived = async (uid: String, mid: String): Promise<any> => {
//     return await MessageModel.deleteOne({ to: uid, _id: mid });
//   }
//   /**
//    * Sends the message to target user.
//    * 
//    * @param uid The user id of the sender
//    * @param tuid The target id to which message is being sent
//    * @param message The message being sent
//    * @returns The newly created message object.
//    */
//   send = async (uid: String, tuid: string, message: String): Promise<Message> => {
//     return await MessageModel.create({ to: tuid, from: uid, message: message, sentOn: new Date() });
//   }
//   /**
//    * Get the list of sent message fo the the specified user. 
//    * @param uid The user id for which message is being sent.
//    * @returns The newly created message object.
//    */
//   listSentMessages = async (uid: String): Promise<Message[]> => {
//     return await MessageModel.find({ from: uid }).populate("to");
//   }
//   /**
//    * Get the list of received message for a user.
//    * @param uid The user for which the list is being fetched.
//    * @returns Json Array of received messages poputed with from user.
//    */
//   listReceivedMessages = async (uid: String): Promise<Message[]> => {
//     return await MessageModel.find({ to: uid }).populate("from");
//   }
// }
