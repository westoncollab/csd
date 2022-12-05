import axios from 'axios';

class UsersService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}

    async saveNewUser (firstName, lastName, email, password) {
        return await this._api.post('/users/new', { firstName, lastName, email, password });
    }

    async tryLogin(email, password) {
        const res = await this._api.post('/users/login', { email, password });
        if (res.status === 400) {
            return {
                isAuthenticated: false
            }
        } else {
            return {
                isAuthenticated: true,
                ...res.data
            }
        } 
    }

    async getStudents() {
        const res = await this._api.get('/users/students');
        return res.data;
    }

    async updateStudent(student) {
        const res = await this._api.put('/users/students', { ...student })  
        return res.data
    }
}

export default UsersService;
