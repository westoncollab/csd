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
}

module.exports = SubjectsController;