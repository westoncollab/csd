import UsersService from '../../services/users.service';
import sha1 from 'crypto-js/sha1';

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
        // smush the email on there, too, so identical passwords are disguised
        const hashedPass = sha1(password + email).toString();
        
        // send to DB
        return await this.usersService.saveNewUser(firstName, lastName, email, hashedPass);
    }
}

export default RegistrationController;