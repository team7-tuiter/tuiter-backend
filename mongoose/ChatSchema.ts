import mongoose, { Schema } from "mongoose";
import MessageType from "../models/Type";
import Chat from "../models/Chat";
/**
 * @file A chat schema for chat model.
 */

const ChatSchema = new mongoose.Schema<Chat>({
    userId1: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userId2: {type: Schema.Types.ObjectId, ref: "UserModel"},
    messages: [{
      id: {type: Schema.Types.String, required: true },
      from: {type: Schema.Types.ObjectId, ref: "UserModel" },
      to: {type: Schema.Types.ObjectId, ref: "UserModel" },
      type: {type: Schema.Types.String, default: MessageType.String, enum: MessageType },
      message: {type: Schema.Types.String, required: true },
      sentOn: {type: Schema.Types.Date, default: Date.now }
    }]
  }, { collection: "chat" });

  export default ChatSchema;