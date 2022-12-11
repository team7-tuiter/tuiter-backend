"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class UserController Implements RESTful Web service API for
 * user CRUD operations on collection users.
 *
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the users existing in the system.
 *     </li>
 *     <li>GET /users/:userid to retrieve a single user based on the uid.
 *     </li>
 *     <li>POST /users saves a new user in the database.
 *     </li>
 *     <li>PUT /users/:uid updates the existing user in the database.
 *     </li>
 *     <li>DELETE /users/:uid deletes the existing user from the database
 *      identified by the user id uid.
 *      </li>
 *      <li>DELETE /users/username/:username/delete deletes the existing
 *      user from the database identified by the user name.
 *      </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing likes CRUD operations.
 * @property {Express} app Express app to add the routes.
 */
class UserController {
    /**
     * Initialises this controller using the express app and user dao.
     *
     * @param app  The express app to add routes.
     * @param tuitDao The dao object to perform database operations.
     */
    constructor(app, userDao) {
        /**
         * List all the users in the database.
         *
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Array of all the users.
         */
        this.findAllUsers = (req, res) => this.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
         * Find a user based on the user id uid.
         *
         * @param {Request} req Represents request from client, using the path params
         * of the user id by uid.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON Object of the user.
         */
        this.findUserById = (req, res) => this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
         * Creates a new user in the database.
         *
         * @param {Request} req Represents request from client, contains
         * request body that is needed to create a new user.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the newly created user.
         */
        this.createUser = (req, res) => this.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
         * Deletes an existing user in the database.
         *
         * @param {Request} req Represents request from client, representing
         * a specific user by uid.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object with delete count.
         */
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
         * Deletes an existing user in the database based on the
         * username provided.
         *
         * @param {Request} req Represents request from client, representing
         * a specific user by uid.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object with delete count.
         */
        this.deleteUserByUsername = (req, res) => this.userDao.deleteUserByUsername(req.params.username)
            .then(status => res.json(status));
        /**
         * Deletes an existing user in the database.
         *
         * @param {Request} req Represents request from client, representing
         * a specific user by uid.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of updated user.
         */
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.delete('/users/username/:username/delete', this.deleteUserByUsername);
        this.app.put('/users/:userid', this.updateUser);
    }
}
exports.default = UserController;
