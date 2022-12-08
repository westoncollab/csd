const bcrypt = require('bcrypt');

const saltRounds = 10;

class UsersController {
    constructor(db) {
        this.db = db;
    }

    saveNewUser(req, res) {
        const { firstName, lastName, subjectId, email, password } = req.body;

        // Salt automatically added bcrypt.
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        this.db.query(`
        INSERT INTO \`users\` (\`firstName\`, \`lastName\`, \`subjectId\`, \`roleId\`, \`email\`, \`password\`)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [firstName, lastName, subjectId, 3, email, hashedPassword]).then(dbResponse => {
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
        INNER JOIN roles ON 
            users.roleId = roles.roleId
        WHERE
            email = ?
        `, [email]).then((rows) => {
            if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].password)) {
                res.status(400).send('Invalid username or password.');
            } else {
                // Update the last login time but don't wait for a response.
                this.db.query('UPDATE users SET lastLoginTime = NOW() WHERE email = ?', [email]);

                const { firstName, lastName, roleName } = rows[0];

                // TODO: Persistence: Sessions? Tokens? 
                res.status(200).json({ email, firstName, lastName, roleName });
            }
        })
    }
}

module.exports = UsersController;
