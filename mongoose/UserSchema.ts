import mongoose from "mongoose";
import AccountType from "../models/AccountType";
import MaritalStatus from "../models/MaritalStatus";
import User from "../models/User";

/**
 * @file A user schema for user model.
 */
const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  email: String,
  profilePhoto: String,
  headerImage: String,
  accountType: { type: String, default: AccountType.Personal, enum: AccountType },
  maritalStatus: { type: String, default: MaritalStatus.Single, enum: MaritalStatus },
  biography: String,
  dateOfBirth: Date,
  joined: { type: Date, default: Date.now },
  location: {
    latitude: { type: Number, default: 0.0 },
    longitude: { type: Number, default: 0.0 },
  },
  totalFollowers: { type: Number, default: 0 },
  totalPosts: { type: Number, default: 0 },
}, { collection: 'users' });

export default UserSchema;

