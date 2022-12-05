import axios from 'axios';

class TestService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}

    async saveTestResults (results, studentId) {
        return await this._api.post('/tests/save-results', { results, studentId });
    }
}

export default TestService;