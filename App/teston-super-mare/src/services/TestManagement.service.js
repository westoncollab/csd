import TestonService from './TestonService';

const BASE_ROUTE = '/tests'
const QUESTIONS_ROUTE = `${BASE_ROUTE}/questions`

class TestManagementService extends TestonService {
    async getTests() {
        const res = await this._api.get(BASE_ROUTE);
        return res.data
    }

    async addTest(testName) {
        const res = await this._api.post(BASE_ROUTE, { testName });
        return res.data 
    }

    async getQuestions(testId) {
        const res = await this._api.get(`${QUESTIONS_ROUTE}/${testId}`);
        return res.data
    }
    
    async addQuestion(testId) {
        const res = await this._api.post(QUESTIONS_ROUTE, { testId });
        return res.data 
    }

    async updateQuestion(question) {  
        const res = await this._api.put(QUESTIONS_ROUTE, { ...question })  
        return res.data
    }

    async deleteQuestions(questionIds) {
        const res = await this._api.delete(QUESTIONS_ROUTE, { data: { questionIds } });
        return res.data
    }
}

export default TestManagementService;
