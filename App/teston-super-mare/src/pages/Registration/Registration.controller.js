import UsersService from '../../services/users.service';

const CryptoJS = require('crypto-js');

class RegistrationController {
    constructor() {
        this.usersService = new UsersService();
    }

    async saveNewUser(firstName, lastName, email, password) {
        // validate input
        if (!firstName || !lastName || !email || !password) {
            return 'Error: missing data';
        }

        // hash password - never use plain text password
        const hashedPass = CryptoJS.SHA1(password).toString();
        
        // send to DB
        // handle result
        return await this.usersService.saveNewUser(firstName, lastName, email, hashedPass);
    }
}

export default RegistrationController;