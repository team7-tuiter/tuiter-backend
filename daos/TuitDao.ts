import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class The class which is responsible for CRUD operations
 * for the Tuit model.
 * 
 * @see TuitDaoI
 */
export default class TuitDao implements TuitDaoI {

  /**
   * Find all the tuits that exists in the database.
   * @returns A promise that resolves to array of tuits.
   */
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }

  /**
   * Finds the tuit for the specific user.
   * @param uid The user for which tuits needs to be found.
   * @returns The promise that resolves to array of tuits.
   */
  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({ postedBy: uid }).populate("postedBy");
  }

  /**
   * Find the tuit by specific tuit id.
   * @param tid The tuit id
   * @returns A promise that resolves to tuit object
   */
  async findTuitById(tid: string): Promise<any> {
    return await TuitModel.findById(tid).populate("postedBy");
  }

  /**
   * Creates a new entry for the tuit in the database.
   * @param tuit The Json object that represents tuit.
   * @returns The JSON of newly created tuit object.
   */
  async createTuit(tuit: Tuit): Promise<Tuit> {
    return await TuitModel.create(tuit);
  }

  /**
   * Updates the existing tuit in the database.
   * @param tid The id of the tuit to be updated.
   * @param tuit The json object of the tuit.
   * @returns The json for newly created tuit.
   */
  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
  }

  /**
   * Deletes the existing tuit based on the tuit id.
   * @param tid The tuit id for tuit needs to be deleted.
   * @returns The JSON object with the delete count.
   */
  async deleteTuit(tid: string): Promise<any> {
    return await TuitModel.deleteOne({ _id: tid });
  }

}

