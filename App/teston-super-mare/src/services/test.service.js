import axios from 'axios';

class TestService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}

    async saveTestResults (results, studentId, testId) {
        return await this._api.post('/tests/save-results', { results, studentId, testId });
    }

    async getStudentLeaderboard (numToGet, userId) {
        const res = await this._api.get(`/results/leaderboard?numToGet=${numToGet}&studentId=${userId}`);
        return res.data;
    }

    async getTests (subject) {
        const res = await this._api.get(`/tests/student?subject=${subject}`);
        return res.data;
    }

    async getTestToDo (testId, studentId, numQuestionsToGet) {
        const res = await this._api.get(`/tests/doTest?id=${testId}&uid=${studentId}&n=${numQuestionsToGet}`);
        return res.data;
    }
}

export default TestService;