const UsersController = require('../controllers/users.controller');

module.exports = function usersRoute(app, db) {
    const usersController = new UsersController(db)

    app.post('/users/new', (req, res) => usersController.saveNewUser(req, res));
}