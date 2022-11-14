import mongoose, { Schema } from "mongoose";
import Follow from "../models/Follow";

/**
 * @file A follow schema for follow model.
 */
const FollowSchema = new mongoose.Schema<Follow>({
  followedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  following: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follow" });
export default FollowSchema;