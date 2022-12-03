import axios from 'axios'

class UsersService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' })
	}

    async saveNewUser (firstName, lastName, email, password) {
        return await this._api.post('/users/new', { firstName, lastName, email, password });
    }
}

export default UsersService;