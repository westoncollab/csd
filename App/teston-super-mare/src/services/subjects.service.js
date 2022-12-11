import axios from "axios";

class SubjectsService {
    constructor() {
        this._api = axios.create({ baseURL: 'http://localhost:5000' });
    }

    async getAllSubjects () {
        const res = await this._api.get('/subjects/all');
        return res.data;
    }

    async addSubject(subject) {
        const res = await this._api.post('/subjects', subject);
        return res.data;
    }
}

export default SubjectsService;