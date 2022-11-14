import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmarks from "../models/Bookmarks";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class A class that provides all the CRUD operations on 
 * bookmarks collection.
 * 
 * @property bookmarkDao Singleton pattern dao object 
 *  to do database operations.
 */
export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;

  /**
   * Creates singleton dao instance.
   * 
   * @return BookmarkDao
   */
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  }

  private constructor() { }

  /**
   * Creates a new bookmark model and saves in the database.
   * 
   * @param uid The userid who is bookmarking the data.
   * @param tid The tuit id which is getting bookmarked.
   * @returns The bookmark object.
   */
  createBookmark = async (uid: String, tid: String): Promise<Bookmarks> => {
    return await BookmarkModel.create({ bookmarkedBy: uid, bookmarkedTuit: tid });
  }

  /**
   * Deletes an existing bookmark for a user.
   * @param uid The user id of the user.
   * @param tid The tuit id of the tuit.
   * @returns Json Object with delete count
   */
  deleteBookmark = async (uid: String, tid: String): Promise<any> => {
    return await BookmarkModel.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid });
  }

  /**
   * List all the bookmarks for a specific user.
   * 
   * @param uid The user for which the bookmarks needs to be listed.
   * @returns The JSON Array of bookmarks
   */
  listBookmarks = async (uid: String): Promise<Bookmarks[]> => {
    return await BookmarkModel.find({ bookmarkedBy: uid }).populate("bookmarkedTuit");
  }
}