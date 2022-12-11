const UsersController = require('../controllers/users.controller');

module.exports = function usersRoute(app, db) {
    const usersController = new UsersController(db)

    app.post('/users/new', (req, res) => usersController.saveNewUser(req, res));
    app.post('/users/login', (req, res) => usersController.login(req, res));
    app.get('/users/students', (req, res) => usersController.getStudents(req, res));
    app.put('/users/students', (req, res) => usersController.updateStudent(req, res));
    app.delete('/users/students', (req, res) => usersController.deleteStudents(req, res));

    app.get('/users/lecturers', (req, res) => usersController.getLecturers(req, res));
    app.post('/users/lecturers', (req, res) => usersController.addLecturer(req, res));
    app.put('/users/lecturers', (req, res) => usersController.updateLecturer(req, res));
    app.delete('/users/lecturers', (req, res) => usersController.deleteLecuters(req, res));
}
