import mongoose from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @file A tuits schema for tuit model.
 */
const TuitSchema = new mongoose.Schema<Tuit>({
  tuit: { type: String, required: true },
  postedOn: { type: Date, default: Date.now },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  likesCount: { type: Number, default: 0 },
}, { collection: 'tuits' });

export default TuitSchema;

