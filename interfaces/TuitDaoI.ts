import Tuit from "../models/Tuit";

/**
 * An interface that provides common operations that
 * can be done on the tuits collection.
 */
export default interface TuitDaoI {
  findAllTuits(): Promise<Tuit[]>;
  findTuitsByUser(uid: string): Promise<Tuit[]>;
  findTuitById(tid: string): Promise<Tuit>;
  createTuit(tuit: Tuit): Promise<Tuit>;
  updateTuit(tid: string, tuit: Tuit): Promise<any>;
  deleteTuit(tid: string): Promise<any>;
}

