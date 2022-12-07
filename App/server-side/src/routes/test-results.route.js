const TestResultsController = require('../controllers/test-results.controller');

module.exports = function testResultsRoute(app, db) {
    const testResultsController = new TestResultsController(db)

    app.post('/tests/save-results', (req, res) => testResultsController.saveTestResults(req, res));

    app.get('/results/leaderboard', (req, res) => testResultsController.getStudentLeaderboard(req, res));
}