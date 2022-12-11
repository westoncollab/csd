const SubjectsController = require('../controllers/subjects.controller');

module.exports = function subjectsRoute(app, db) {
    const subjectsController = new SubjectsController(db)

    app.get('/subjects/all', (req, res) => subjectsController.getAllSubjects(req, res));
    app.post('/subjects', (req, res) => subjectsController.addSubject(req, res));
}