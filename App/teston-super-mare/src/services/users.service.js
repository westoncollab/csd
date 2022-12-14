import axios from 'axios';

class UsersService {
    constructor() {
		this._api = axios.create({ baseURL: 'http://localhost:5000' });
	}

    async saveNewUser (firstName, lastName, subjectId, email, password) {
        return await this._api.post('/users/new', { firstName, lastName, subjectId, email, password });
    }

    async tryLogin(email, password) {
        try {
            const res = await this._api.post('/users/login', { email, password });
            return {
                isAuthenticated: true,
                ...res.data
            }
        }
        catch (axiosError) { 
            if (axiosError.code === 'ERR_BAD_REQUEST') { 
                return {
                    isAuthenticated: false
                }
            } 

            throw axiosError
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

    async deleteStudents(userIds) {
        const res = await this._api.delete('/users/students', { data: { userIds } });
        return res.data    
    }

    async addLecturer(firstName, lastName, email, password) {
        const res = await this._api.post('/users/lecturers', { firstName, lastName, email, password });
        return res.data
    }

    async getLecturers() {
        const res = await this._api.get('/users/lecturers');
        return res.data;
    }

    async updateLecturer(lecturer) {
        const res = await this._api.put('/users/lecturers', { ...lecturer })  
        return res.data
    }

    async deleteLecturers(userIds) {
        const res = await this._api.delete('/users/lecturers', { data: { userIds } });
        return res.data   
    }
}

export default UsersService;
