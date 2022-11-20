import Bookmarks from "../models/Bookmarks";

/**
 * An interface that provides common operations that
 * can be done on the bookmark collection.
 */
export default interface BookmarkDaoI {
  createBookmark(uid: String, tid: string): Promise<Bookmarks>;
  deleteBookmark(uid: String, tid: string): Promise<any>;
  listBookmarks(uid: String): Promise<Bookmarks[]>;
};