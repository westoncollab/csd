const UsersController = require('../controllers/users.controller');

module.exports = function usersRoute(app, db) {
    const usersController = new UsersController(db)

    app.post('/users/new', (req, res) => usersController.saveNewUser(req, res));
    app.post('/users/login', (req, res) => usersController.login(req, res));
    app.get('/users/students', (req, res) => usersController.getStudents(req, res));
    app.put('/users/students', (req, res) => usersController.updateStudent(req, res));
}
