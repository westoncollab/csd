const TestResultsController = require('../controllers/test-results.controller');

module.exports = function testResultsRoute(app, db) {
    const testResultsController = new TestResultsController(db)

    app.post('/tests/save-results', (req, res) => testResultsController.saveTestResults(req, res));
}