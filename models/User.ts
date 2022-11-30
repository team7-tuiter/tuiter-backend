import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";

/**
 * A model representation of a single user in our application.
 * @property {String} _id the id of the users 
 * @property {String} username The username of the user.
 * @property {String} password The password of the user.
 * @property {String} firstName The first name of the user.
 * @property {String} lastName The last name of the user.
 * @property {String} email The email of the user.
 * @property {String} profilePhoto The profile photo of the user.
 * @property {String} headerImage The header image of the user.
 * @property {AccountType} accountType The account type for the user. Defaults to personal.
 * @property {MaritalStatus} maritalStatus The marital status of user, defaults to Single.
 * @property {String} biography The biography of the user.
 * @property {Date} dateOfBirth The user's birthdate.
 * @property {Date} joined The date on which the user joined.
 * @property {Location} location The location of the user.
 * @property {Number} totalFollowers The total followers count.
 * @property {Number} totalPosts The count of total posts by him.
 * 
 * @see AccountType
 * @see MaritalStatus
 */
export default interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  headerImage: string;
  accountType: AccountType;
  maritalStatus: MaritalStatus;
  biography: string;
  dateOfBirth: Date;
  joined: Date;
  location: Location;
  totalFollowers: Number;
  totalPosts: Number;
}
