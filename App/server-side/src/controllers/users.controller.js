const bcrypt = require('bcrypt');

class UsersController {
    constructor(db) {
        this.db = db;
    }

    saveNewUser(req, res) {
        const { firstName, lastName, email, password } = req.body;

        // Salt automatically added bcrypt.
        const hashedPassword = bcrypt.hashSync(password);

        this.db.query(`
        INSERT INTO \`users\` (\`firstName\`, \`lastName\`, \`roleId\`, \`email\`, \`password\`)
        VALUES (?, ?, ?, ?, ?);
        `, [firstName, lastName, 3, email, hashedPassword]).then(dbResponse => {
            if (dbResponse.affectedRows && dbResponse.affectedRows === 1) {
                res.status(201).send('success');
            }
        }).catch(err => {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(500).send('duplicate');
            } else {
                console.log(err);
                res.send(err);
            }
        })
    }

    login(req, res) {
        const { email, password } = req.body;

        this.db.query(`
        SELECT 
            firstName, lastName, roleName, password 
        FROM
            users
        INNER JOIN ON 
            users.roleId = roles.roleId
        WHERE
            email = ?
        `, [email]).then((rows) => {
            if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].hashedPassword)) {
                res.status(400).send('Invalid username or password.');
            } else {
                // Update the last login time but don't wait for a response.
                this.db.query('UPDATE users SET lastLoginTime = NOW() WHERE email = ?', [email]);

                // TODO: Persistence: Sessions? Tokens? 
                res.status(200).json({ email, firstName, lastName, roleName });
            }
        })
    }
}

module.exports = UsersController;
