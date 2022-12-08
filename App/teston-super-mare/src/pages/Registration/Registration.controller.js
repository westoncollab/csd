import UsersService from '../../services/users.service';

class RegistrationController {
    constructor() {
        this.usersService = new UsersService();
    }

    async saveNewUser(firstName, lastName, subjectId, email, password) {
        // validate input
        if (!firstName || !lastName || !subjectId || !email || !password) {
            return 'Error: missing data';
        }

        // send to DB - passwords hashed on the server.
        return await this.usersService.saveNewUser(
            firstName,
            lastName,
            subjectId,
            email,
            password
        );
    }
}

export default RegistrationController;