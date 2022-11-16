/**
 * @file Implements mongoose model to CRUD
 * documents in the chat collection
 */
 import mongoose from "mongoose";
 import ChatSchema from "./ChatSchema";
 const ChatModel = mongoose.model("ChatModel", ChatSchema);
 export default ChatModel;