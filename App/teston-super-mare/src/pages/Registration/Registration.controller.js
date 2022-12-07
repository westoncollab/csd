import UsersService from '../../services/users.service';

class RegistrationController {
    constructor() {
        this.usersService = new UsersService();
    }

    async saveNewUser(firstName, lastName, email, password) {
        // validate input
        if (!firstName || !lastName || !email || !password) {
            return 'Error: missing data';
        }

        // send to DB - passwords hashed on the server.
        return await this.usersService.saveNewUser(firstName, lastName, email, password);
    }
}

export default RegistrationController;