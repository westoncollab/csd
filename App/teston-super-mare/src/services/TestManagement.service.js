import TestonService from './TestonService';

const ROUTE = '/tests/questions'

class TestManagementService extends TestonService {
    async getQuestions(testName) {
        const res = await this._api.get(ROUTE, { testName });
        return res.data
    }
    
    async addQuestion(testName) {
        const res = await this._api.post(ROUTE, { testName });
        return res.data 
    }

    async updateQuestion(question) {
        const res = await this._api.put(ROUTE, { question })
        return res.data
    }

    async deleteQuestions(questionIds) {
        const res = await this._api.delete(ROUTE, { data: { questionIds } });
        return res.data
    }
}

export default TestManagementService;
