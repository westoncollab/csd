class SubjectsController {
    constructor(db) {
        this.db = db;
    }

    getAllSubjects (req, res) {
        this.db.query(`SELECT * FROM \`subjects\`;`)
        .then((dbResult) => {
            res.status(200).send(dbResult);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    addSubject(req, res) {
        const { subjectName } = req.body;
        if (!subjectName) {
            res.status(400).send('No subjectName specified in JSON body');
        }

        this.db.query(`INSERT INTO subjects (subjectName) VALUES (?)`, [subjectName])
            .then((dbResult) => {
                res.status(200).json({ insertId: Number(dbResult.insertId) });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Failed to insert subject');
            })
    }
}

module.exports = SubjectsController;
