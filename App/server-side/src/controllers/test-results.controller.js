
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

    _calcAverageTestScore (allTests, testResults, studentId, includeIncompleted = false) {
        const valueOfIncompleteTest = 0;
        let testsCompleted = 0;
        const scoresSum = allTests.reduce((prevVal, currentTest) => {
            const resultRecord = testResults.find(row => row.testId === currentTest.testId && row.studentId === studentId);
            testsCompleted += resultRecord ? 1 : 0;
            if (includeIncompleted && !resultRecord) {
                // only use valueOfIncompleteTest for score of tests never done if includIncompleted
                return prevVal + valueOfIncompleteTest;
            } else if (resultRecord) {
                // otherwise, a normal decimal correct out of max questions, ignoring tests never done
                return prevVal + (Number(resultRecord.numCorrect) / Number(currentTest.questionCount));
            } else {
                return prevVal;
            }
        }, 0);
        if (scoresSum === 0) {
            return 0;
        }
        if (includeIncompleted) {
            return scoresSum / allTests.length;
        } else {
            return scoresSum / testsCompleted;
        }
    }

    _calcStudentAveragesIncIncompleteTests (allTests, students, testResults) {
        const studentAverages = students.map(stu => ({ 
            studentId: stu.userId,
            average: this._calcAverageTestScore(allTests, testResults, stu.userId, true)
        }));
        studentAverages.sort((a, b) => b.average - a.average);
        return studentAverages;
    }

    _rankStudentsByAverage (numToGet, studentAverages, students, studentId) {
        const studentLeaderboard = [];
        let studentRank = 0;
        let currentRank = 1;
        studentAverages.forEach((row, i) => {
            if (i !== 0 && studentAverages[i - 1].average !== row.average) {
                // increase current place every time a lower average score is found
                currentRank += 1;
            }
            if (studentLeaderboard.length < Math.min(numToGet, students.length)) {
                // generate leaderboard position
                studentLeaderboard.push({
                    place: currentRank,
                    uid: row.studentId,
                    name: students.find(s => s.userId === row.studentId).name
                });
            }
            if (row.studentId === studentId) {
                // found student's rank
                studentRank = currentRank;
            }
        });
        return { studentLeaderboard, studentRank };
    }

    async getStudentLeaderboard (req, res) {
        const numToGet = Number(req.query.numToGet);
        const studentId = Number(req.query.studentId);

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
                    t.\`answeredInTestId\` AS testId,
                    t.\`studentId\`,
                    COUNT(t.\`correct\`) AS numCorrect
                FROM \`testResults\` AS t
                WHERE \`correct\` = 1
                INNER JOIN (
                    SELECT \`studentId\`, MAX(COUNT(\`correct\`)) AS maxCorrect
                    FROM \`testResults\`
                    WHERE \`correct\` = 1
                    GROUP BY \`answeredInTestId\`, \`studentId\`
                ) AS t1 ON
                    t.\`answeredInTestId\` = t1.\`answeredInTestId\`
                    AND t.\`studentId\` = t1.\`studentId\`
                    AND t.numCorrect = t1.maxCorrect
                GROUP BY \`answeredInTestId\`, \`studentId\`;
            `)
        ]);
        console.log(testResults);
        
        const studentAverages = this._calcStudentAveragesIncIncompleteTests(allTests, students, testResults);
        const { studentLeaderboard, studentRank } = this._rankStudentsByAverage(numToGet, studentAverages, students, studentId);
        const userStats = {
            rank: studentRank,
            average: this._calcAverageTestScore(allTests, testResults, studentId),
            total: testResults.filter(testResult => testResult.studentId === studentId).length
        };

        res.status(200).send({ studentLeaderboard, totalStudents: students.length, userStats });
    }
}

module.exports = TestResultsController;