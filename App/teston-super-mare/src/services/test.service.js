import axios from 'axios';

class TestService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}

    async saveTestResults (results, studentId, testId) {
        return await this._api.post('/tests/save-results', { results, studentId, testId });
    }

    async getStudentLeaderboard (numToGet) {
        return await this._api.get(`/results/get-leaderboard?num=${numToGet}`);
        // return [
        //     { place: 1, uid: 23, name: 'Stu' },
        //     { place: 2, uid: 12, name: 'May' },
        //     { place: 3, uid: 24, name: 'Bob' },
        //     { place: 4, uid: 27,name: 'Frd' },
        //     { place: 5, uid: 2,name: 'Sue' }
        // ];
    }

    getStudentResultStats (userId) {
        return { rank: 2, average: 22, total: 13 };
    }
}

export default TestService;