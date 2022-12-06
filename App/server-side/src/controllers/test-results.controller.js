
class TestResultsController {
    constructor(db) {
        this.db = db;
    }

    saveTestResults (req, res) {
        const { results, studentId, testId } = req.body;
        const date = new Date(); // today's date/time

        const records = results.map(({ qid, correct }) => [ qid, studentId, date, testId, correct ? 1 : 0 ]);

        this.db.query(`
       INSERT INTO \`testResults\` (\`questionId\`, \`studentId\`, \`date\`, \`answeredInTestId\`, \`correct\`)
       VALUES ${records.map(() => '(?, ?, ?, ?, ?)').join(',\n')};
       `, records.flat()).then(dbResponse => {
            if (dbResponse.affectedRows && dbResponse.affectedRows > 0) {
                res.status(201).send('success');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    async getStudentLeaderboard (req, res) {
        const { num } = req.query;

        // const [totalTests, students, testResults] = Promise.all([
        //     this.db.query(`SELECT COUNT(\`testId\`) AS total FROM \`tests\`;`),
        //     this.db.query(`
        //         SELECT
        //             \`userId\`,
        //             \`firstName\` + " " + \`lastName\` AS name
        //         FROM \`users\`
        //         WHERE \`roleId\` = 3;
        //     `),
        //     this.db.query(`
        //         SELECT
        //     `)
        // ]);

        res.status(200).send([]);
    }
}

module.exports = TestResultsController;