import axios from 'axios';

class TestonService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}
}

export default TestonService;
