import axios from 'axios';

class TestService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}

    async saveTestResults (results, studentId, testId) {
        return await this._api.post('/tests/save-results', { results, studentId, testId });
    }

    async getStudentLeaderboard (numToGet) {
        const res = await this._api.get(`/results/get-leaderboard?num=${numToGet}`);
        return res.data;
    }

    getStudentResultStats (userId) {
        return { rank: 2, average: 22, total: 13 };
    }
}

export default TestService;