const bcrypt = require('bcrypt');

const saltRounds = 10;
const studentRoleId = 3;
const lecturerRoleId = 2;

class UsersController {
    constructor(db) {
        this.db = db;
    }

    saveNewUser(req, res) {
        const { firstName, lastName, email, password } = req.body;

        // Salt automatically added bcrypt.
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        this.db.query(`
        INSERT INTO \`users\` (\`firstName\`, \`lastName\`, \`roleId\`, \`email\`, \`password\`)
        VALUES (?, ?, ?, ?, ?);
        `, [firstName, lastName, studentRoleId, email, hashedPassword]).then(dbResponse => {
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
                res.status(401).send('Invalid username or password.');
            } else {
                // Update the last login time but don't wait for a response.
                this.db.query('UPDATE users SET lastLoginTime = NOW() WHERE email = ?', [email]);

                const { firstName, lastName, roleName } = rows[0];

                // TODO: Persistence: Sessions? Tokens? 
                res.status(200).json({ email, firstName, lastName, roleName });
            }
        })
    }

    getStudents(_req, res) {
        this.db.query(`
        SELECT
        userId, firstName, lastName, email, isApproved, lastLoginTime
        FROM 
            users
        INNER JOIN roles ON
            users.roleId = roles.roleId
        WHERE
            roles.roleName = "Student"
        `).then((rows) => {
            if (rows.length === 0) {
                res.json([]);
            } else {
                res.json(rows);
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send();
        });
    }

    updateStudent(req, res) {
        const { userId, firstName, lastName, email, isApproved } = req.body;
        if (!userId) {
            res.status(400).send('userId is required in the request\'s JSON body');
            return;
        }

        // If the argument is 'undefined', convert it to 'null' so it can be sent to the database.
        function undefinedGuard(arg) {
            return arg === undefined ? null : arg
        }

        this.db.query(
            `UPDATE users
            SET firstName = ?, lastName = ?, email = ?, isApproved = ?
            WHERE userId = ?`,
            [
                undefinedGuard(firstName),
                undefinedGuard(lastName),
                undefinedGuard(email),
                undefinedGuard(isApproved),
                userId
            ])
            .then(() => {
                res.status(200).send();
            })
    }

    deleteStudents(req, res) {
        const { userIds } = req.body;
        this.db.query(`DELETE FROM testResults WHERE studentId IN (?)`, [userIds]).then(() => {
            this.db.query(`DELETE FROM users WHERE userId IN (?)`, [userIds])
                .then(() => {
                    res.status(200).send();
                })
        })

    }

    getLecturers(req, res) {
        this.db.query(`
        SELECT
        userId, firstName, lastName, email, lastLoginTime, isApproved
        FROM 
            users
        INNER JOIN roles ON
            users.roleId = roles.roleId
        WHERE
            roles.roleName = "Lecturer"
        `).then((rows) => {
            if (rows.length === 0) {
                res.json([]);
            } else {
                res.json(rows);
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send();
        });
    }

    addLecturer(req, res) {
         const { firstName, lastName, email, password } = req.body;

        // Salt automatically added bcrypt.
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        this.db.query(`
        INSERT INTO users (firstName, lastName, roleId, email, password, isApproved)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [firstName, lastName, lecturerRoleId, email, hashedPassword, 1]).then(dbResponse => {
            if (dbResponse.affectedRows && dbResponse.affectedRows === 1) {
                res.status(201).json({ insertId: Number(dbResponse.insertId) });
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

    updateLecturer(req, res) {
        const { userId, firstName, lastName, email, isApproved } = req.body;
        if (!userId) {
            res.status(400).send('userId is required in the request\'s JSON body');
            return;
        }

        // If the argument is 'undefined', convert it to 'null' so it can be sent to the database.
        function undefinedGuard(arg) {
            return arg === undefined ? null : arg
        }

        this.db.query(
            `UPDATE users
            SET firstName = ?, lastName = ?, email = ?, isApproved = ?
            WHERE userId = ?`,
            [
                undefinedGuard(firstName),
                undefinedGuard(lastName),
                undefinedGuard(email),
                undefinedGuard(isApproved),
                userId
            ])
            .then(() => {
                res.status(200).send();
            })
    }

    deleteLecuters(req, res) {
        const { userIds } = req.body;
    
        this.db.query(`DELETE FROM users WHERE userId IN (?)`, [userIds])
            .then(() => {
                res.status(200).send();
            })
    }
}

module.exports = UsersController;
