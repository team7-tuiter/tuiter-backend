"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class TuitController Implements RESTful Web service API for
 * tuits CRUD operations on collection tuits.
 *
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retrieve all the tuits existing in the system.
 *     </li>
 *     <li>GET /tuits/:tid to retrieve a single tuit based on the tid.
 *     </li>
 *     <li>GET /users/:userid/tuits list all the tuits by the user.
 *     </li>
 *     <li>POST /tuits saves a new tuit in the database.
 *     </li>
 *     <li>PUT /tuits updates the existing tuit in the database.
 *     </li>
 *     <li>DELETE /tuits/:tid deletes the existing tuit in the database
 *      identified by the tuit id tid.
 *      </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing likes CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    /**
     * Initialises this controller using the express app and tuit dao.
     *
     * @param app  The express app to add routes.
     * @param tuitDao The dao object to perform database operations.
     */
    constructor(app, tuitDao) {
        /**
         * List all the tuits in the database.
         *
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Array of all the tuits.
         */
        this.findAllTuits = (req, res) => this.tuitDao.findAllTuits().then(tuits => res.json(tuits));
        /**
         * Finds a tuit based on the id.
         *
         * @param {Request} req Represents request from client, including the path
         * param tid representing tuit id.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object of the tuit.
         */
        this.findTuitById = (req, res) => this.tuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));
        /**
         * List all the tuits made by a user in the database.
         *
         * @param {Request} req Represents request from client, including the
         * path param userid for which all the tuits needs to be fetched.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Array of all the tuits made by the user.
         */
        this.findTuitsByUser = (req, res) => this.tuitDao.findTuitsByUser(req.params.userid).then(tuits => res.json(tuits));
        /**
         * Create a new tuit in the database.
         *
         * @param {Request} req Represents request from client, including the request
         * body that contains the who is posting and what content.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object of the new tuit saved.
         */
        this.createTuit = (req, res) => this.tuitDao.createTuit(req.body).then(tuit => res.json(tuit));
        /**
         * Updates an existing tuit in the database.
         *
         * @param {Request} req Represents request from client, including the request
         * body that contains the who is posting and the updated content.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object of the updated tuit saved.
         */
        this.updateTuit = (req, res) => this.tuitDao.updateTuit(req.params.tid, req.body).then(tuit => res.json(tuit));
        /**
         * Deletes an existing tuit.
         *
         * @param {Request} req Represents request from client, including the request
         * path param that identifies a single tuit.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object of the deleted count.
         */
        this.deleteTuit = (req, res) => this.tuitDao.deleteTuit(req.params.tid).then(tuit => res.json(tuit));
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.get('/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
    }
}
exports.default = TuitController;
