
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

        // get data from DB - not sure if these would be more efficient if they used subqueries
        const [allTests, students, testResults] = await Promise.all([
            // get all tests
            this.db.query(`
                SELECT
                    \`tests\`.\`testId\`,
                    COUNT(\`testQuestions\`.\`questionId\`) AS questionCount
                FROM \`tests\`
                JOIN \`testQuestions\` ON \`tests\`.\`testId\` = \`testQuestions\`.\`testId\`
                GROUP BY \`tests\`.\`testId\`;
            `),
            // get all students
            this.db.query(`
                SELECT
                    \`userId\`,
                    CONCAT(\`firstName\`, " ", \`lastName\`) AS name
                FROM \`users\`
                WHERE \`roleId\` = 3;
            `),
            // get all students' test results
            this.db.query(`
                SELECT
                    \`answeredInTestId\` AS testId,
                    \`studentId\`,
                    COUNT(\`correct\`) AS numCorrect
                FROM \`testResults\`
                WHERE \`correct\` = 1
                GROUP BY \`answeredInTestId\`, \`studentId\`;
            `)
        ]);
        
        // work out student averages (including scores of 0 for tests not completed)
        const studentAverages = students.map(stu => ({ 
            studentId: stu.userId,
            average: allTests.reduce((prevVal, currentTest) => {
                const resultRecord = testResults.find(row => row.testId === currentTest.testId && row.studentId === stu.userId);
                return prevVal + (resultRecord ? Number(resultRecord.numCorrect) / Number(currentTest.questionCount) : 0);
            }, 0) / allTests.length
        }));
        studentAverages.sort((a, b) => b.average - a.average);

        // rank by those student averages
        const studentLeaderboard = [];
        let currentPlace = 1;
        studentAverages.forEach((row, i) => {
            if (studentLeaderboard.length < Math.min(num, students.length)) {
                if (i == 0 || studentAverages[i - 1].average !== row.average) {
                    studentLeaderboard.push({
                        place: currentPlace,
                        uid: row.studentId,
                        name: students.find(s => s.userId === row.studentId).name
                    });
                    currentPlace += 1;
                } else {
                    studentLeaderboard.push({
                        place: currentPlace - 1,
                        uid: row.studentId,
                        name: students.find(s => s.userId === row.studentId).name
                    });
                }
            }
        });

        res.status(200).send({ studentLeaderboard, totalStudents: students.length });
    }
}

module.exports = TestResultsController;