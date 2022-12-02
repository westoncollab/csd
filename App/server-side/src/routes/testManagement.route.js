const TestManagementController = require('../controllers/testManagement.controller');

module.exports = function testManagementRoute(app, db) {
    const controller = new TestManagementController(db)

    app.get('/tests', (req, res) => controller.getTests(req, res));
    app.post('/tests', (req, res) => controller.addTest(req, res));

    app.get('/tests/questions/:testId', (req, res) => controller.getQuestions(req, res));
    app.post('/tests/questions', (req, res) => controller.addQuestion(req, res));
    app.put('/tests/questions', (req, res) => controller.updateQuestion(req, res));
    app.delete('/tests/questions', (req, res) => controller.deleteQuestions(req, res));
}
