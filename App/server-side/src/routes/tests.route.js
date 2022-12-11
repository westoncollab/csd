const TestsController = require('../controllers/test.controller');

module.exports = function testsRoute(app, db) {
    const testsController = new TestsController(db)

    app.post('/tests/save-results', (req, res) => testsController.saveTestResults(req, res));

    app.get('/results/leaderboard', (req, res) => testsController.getStudentLeaderboard(req, res));
    app.get('/tests/student', (req, res) => testsController.getTestsOfSubject(req, res));
}