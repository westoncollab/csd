const UsersController = require('../controllers/users.controller');
const usersController = new UsersController()

module.exports = function usersRoute(app) {
    app.post('/users/new', (req, res) => usersController.saveNewUser(req, res));
}