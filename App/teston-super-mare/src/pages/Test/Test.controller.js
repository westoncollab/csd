import TestService from '../../services/test.service';


const testService = new TestService();
class TestController {
    async saveTestResults (results, studentId) {
        return await testService.saveTestResults(results, studentId);
    }
}

export default TestController;