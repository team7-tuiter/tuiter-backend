import mongoose, { Schema } from "mongoose";
import MessageType from "../models/Type";
import Chat from "../models/Chat";
/**
 * @file A chat schema for chat model.
 */

const ChatSchema = new mongoose.Schema<Chat>({
    userId1: {type: String, ref: "UserModel"},
    userId2: {type: String, ref: "UserModel"},
    messages: [{
      id: {type: Schema.Types.String, required: true },
      from: {type: String, ref: "UserModel" },
      to: {type: String, ref: "UserModel" },
      type: {type: Schema.Types.String, default: MessageType.String, enum: MessageType },
      message: {type: Schema.Types.String, required: true },
      sentOn: {type: Schema.Types.Date, default: Date.now }
    }]
  }, { collection: "chat" });

  export default ChatSchema;