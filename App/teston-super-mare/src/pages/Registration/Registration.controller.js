import UsersService from '../../services/users.service';
const CryptoJS = require('crypto-js');

class RegistrationController {
    constructor() {
        this.usersService = new UsersService();
    }

    async saveNewUser(newUser) {
        // validate input
        if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
            return 'Erorr: missing data';
        }

        // hash password - never use plain text password
        const hashedPass = CryptoJS.SHA1(newUser.password).toString();
        
        // send to DB
        const res = await this.usersService.saveNewUser(newUser.firstName, newUser.lastName, newUser.email, hashedPass);

        // handle result
        return 'success!';
    }
}

export default RegistrationController;