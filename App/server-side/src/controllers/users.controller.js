
class UsersController {
    constructor(db) {
        this.db = db;
    }

    saveNewUser (req, res) {
        const { firstName, lastName, email, password } = req.body;

        this.db.query(`
       INSERT INTO \`users\` (\`firstName\`, \`lastName\`, \`roleId\`, \`email\`, \`password\`)
       VALUES (?, ?, ?, ?, ?);
       `, [firstName, lastName, 3, email, password]).then(res => {
            if (res.affectedRows && res.affectedRows === 1) {
                res.status(200);
            }
        }).catch(err => {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(500).send(`User record already exists with email: ${email}`);
            } else {
                res.status(500).send('There was an error');
            }
        })
    }
}

module.exports = UsersController;