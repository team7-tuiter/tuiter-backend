import mongoose, { Schema } from "mongoose";
import Message from "../models/Message";
/**
 * @file A chat schema for chat model.
 */

const ChatSchema = new mongoose.Schema({
    userId1: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userId2: {type: Schema.Types.ObjectId, ref: "UserModel"},
    messages: [{
      _id: {type: Schema.Types.String, required: true },
      from: {type: Schema.Types.ObjectId, ref: "UserModel" },
      to: {type: Schema.Types.ObjectId, ref: "UserModel" },
      type: {type: Schema.Types.String, required: true },
      message: {type: Schema.Types.String, required: true },
      dateSent: {type: Schema.Types.Date, required: true }
    }]
  }, { collection: "messages" });

  export default ChatSchema;