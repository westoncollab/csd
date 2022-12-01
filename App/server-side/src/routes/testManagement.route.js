const TestManagementController = require('../controllers/testManagement.controller');

module.exports = function testManagementRoute(app, db) {
    const controller = new TestManagementController(db)
    const route = '/tests/questions'

    app.get(route, (req, res) => controller.getQuestions(req, res));
    app.post(route, (req, res) => controller.addQuestion(req, res));
    app.put(route, (req, res) => controller.updateQuestion(req, res));
    app.delete(route, (req, res) => controller.deleteQuestions(req, res));
}
