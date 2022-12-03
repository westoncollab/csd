
class UsersController {
    constructor(db) {
        this.db = db;
    }

    saveNewUser (req, res) {
        const { firstName, lastName, email, password } = req.body;

        this.db.query(`
       INSERT INTO \`users\` (\`firstName\`, \`lastName\`, \`roleId\`, \`email\`, \`password\`)
       VALUES (?, ?, ?, ?, ?);
       `, [firstName, lastName, 3, email, password]).then(dbResponse => {
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
}

module.exports = UsersController;