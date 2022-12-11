
class TestsController {
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

    _calcAverageTestScore (allTests, testResults, studentId, subjectId, includeIncompleted = false) {
        const valueOfIncompleteTest = 0;
        let testsCompleted = 0;
        const scoresSum = allTests.reduce((prevVal, currentTest) => {
            const resultRecord = testResults.find(row => row.testId === currentTest.testId && row.studentId === studentId);
            testsCompleted += resultRecord ? 1 : 0;
            if (includeIncompleted && !resultRecord && currentTest.subjects.includes(subjectId)) {
                // only use valueOfIncompleteTest for score of tests never done if includeIncompleted
                // and test is on same subject as student
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
            average: this._calcAverageTestScore(allTests, testResults, stu.userId, stu.subjectId, true)
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

        const [testsSubjects, students, testResults] = await Promise.all([
            // get all tests
            this.db.query(`
                SELECT
                    \`tests\`.\`testId\`,
                    COUNT(\`testQuestions\`.\`questionId\`) AS questionCount,
                    \`questions\`.\`subjectId\`
                FROM \`tests\`
                JOIN \`testQuestions\` ON \`tests\`.\`testId\` = \`testQuestions\`.\`testId\`
                JOIN \`questions\` ON \`questions\`.\`questionId\` = \`testQuestions\`.\`questionId\`
                GROUP BY \`tests\`.\`testId\`, \`questions\`.\`subjectId\`;
            `),
            // get all students
            this.db.query(`
                SELECT
                    \`userId\`,
                    CONCAT(\`firstName\`, " ", \`lastName\`) AS name,
                    \`subjectId\`
                FROM \`users\`
                WHERE \`roleId\` = 3;
            `),
            // get all students' test results
            this.db.query(`
                SELECT
                    \`answeredInTestId\` AS testId,
                    \`studentId\`,
                    MAX(t1.countCorrect) AS numCorrect
                FROM (
                    SELECT
                        \`answeredInTestId\`,
                        \`studentId\`,
                        \`date\`,
                        COUNT(\`correct\`) AS countCorrect
                    FROM \`testResults\`
                    WHERE \`correct\` = 1
                    GROUP BY \`answeredInTestId\`, \`studentId\`, \`date\`
                ) t1
                GROUP BY \`answeredInTestId\`, \`studentId\`;
            `)
        ]);
        // collect tests' subjects and number of questions
        const allTests = testsSubjects.reduce((total, current) => {
            const existingIndex = total.findIndex(t => t.testId === current.testId);
            if (existingIndex !== -1) {
                // replace existing test obj
                total[existingIndex].questionCount += Number(current.questionCount);
                total[existingIndex].subjects = total[existingIndex].subjects.concat([current.subjectId]);
            } else {
                // add a new test obj
                total.push({
                    testId: current.testId,
                    questionCount: Number(current.questionCount),
                    subjects: [current.subjectId]
                });
            }
            return total;
        }, []);
        
        const studentAverages = this._calcStudentAveragesIncIncompleteTests(allTests, students, testResults);
        const { studentLeaderboard, studentRank } = this._rankStudentsByAverage(numToGet, studentAverages, students, studentId);
        const userStats = {
            rank: studentRank,
            average: this._calcAverageTestScore(allTests, testResults, studentId, students.find(s => s.userId === studentId).subjectId),
            total: testResults.filter(testResult => testResult.studentId === studentId).length
        };

        res.json({ studentLeaderboard, totalStudents: students.length, userStats });
    }

    async getTestsOfSubject (req, res) {
        try {
            const subject = Number(req.query.subject);

            const testsSubjects = await this.db.query(`
                SELECT
                    \`tests\`.\`testId\`, 
                    \`tests\`.\`name\` AS testName,
                    CONCAT(\`users\`.\`firstName\`, " ", \`users\`.\`lastName\`) AS lecturerName,
                    \`subjects\`.\`subjectId\`,
                    \`subjects\`.\`subjectName\`
                FROM \`tests\`
                JOIN \`users\` ON \`tests\`.\`createdByLecturerId\` = \`users\`.\`userId\`
                JOIN \`testQuestions\` ON \`tests\`.\`testId\` = \`testQuestions\`.\`testId\`
                JOIN \`questions\` ON \`testQuestions\`.\`questionId\` = \`questions\`.\`questionId\`
                JOIN \`subjects\` ON \`questions\`.\`subjectId\` = \`subjects\`.\`subjectId\`
                GROUP BY \`tests\`.\`testId\`, \`questions\`.\`subjectId\`;
            `);

            // collect tests' subjects
            const tests = testsSubjects
            .reduce((total, current) => {
                const existingIndex = total.findIndex(t => t.testId === current.testId);
                if (existingIndex !== -1) {
                    // replace existing test obj
                    total[existingIndex].subjectIds = total[existingIndex].subjectIds.concat([current.subjectId]);
                    total[existingIndex].subjectNames = total[existingIndex].subjectNames.concat([current.subjectName]);
                } else {
                    // add a new test obj
                    total.push({
                        testId: current.testId,
                        testName: current.testName,
                        subjectIds: [current.subjectId],
                        subjectNames: [current.subjectName],
                        lecturerName: current.lecturerName
                    });
                }
                return total;
            }, [])
            // only keep tests with questions with the same subject as the student
            .filter(t => t.subjectIds.includes(subject))
            .map(t => ({
                id: t.testId,
                testName: t.testName,
                subjects: t.subjectNames.join(', '),
                lecturerName: t.lecturerName
            }));

            res.status(200).send(tests);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    async _assembleWeightedQuestions (testQuestions, studentId) {
        // edit these to balance likelihood of seeing correctly/incorrectly answered questions again
        const correctWeighting = -0.5;
        const incorrectWeighting = 1;
        const maximumWeight = 10;
        const defaultWeight = maximumWeight / 2;
        const weightQuestions = (results) => {
            return new Map(testQuestions.map(q => {
                const weight = Math.round(results
                    .filter(r => r.questionId == q.questionId)
                    .reduce((total, curr) => total + (curr.correct ? correctWeighting : incorrectWeighting), defaultWeight)
                );
                return [
                    q.questionId,
                    // keep weight in range between 1 and maximumWeight
                    weight > maximumWeight ? maximumWeight
                    : weight < 1 ? 1
                    : weight
                ];
            }));
        }

        // get weights
        const prevResults = await this.db.query(`
            SELECT * FROM \`testResults\` WHERE \`studentId\` = ? AND \`questionId\` IN (?);
        `, [studentId, testQuestions.map(q => q.questionId).join(', ')]);
        const questionWeights = weightQuestions (prevResults);
                
        // assemble array to pick from
        let weightedQuestions = [];
        Array.from(questionWeights.keys()).forEach(qid => {
            const numOfTimes = questionWeights.get(qid);
            const qidsToAdd = Array.from(new Array(numOfTimes).keys()).map(() => qid);
            weightedQuestions = weightedQuestions.concat(qidsToAdd);
        });
        return weightedQuestions;
    }

    _randomiseQuestionAnswers (q) {
        // randomise order of answers so it's not always the first one
        const answers = [
            q.correctAnswer,
            q.incorrectAnswerA,
            q.incorrectAnswerB,
            q.incorrectAnswerC
        ].filter(a => a) // remove null answers if there are less than four
        .sort(() => Math.random() - 0.5); // random order
        return {
            qid: q.questionId,
            question: q.question,
            a: answers[0],
            b: answers[1],
            c: answers[2] ?? undefined,
            d: answers[3] ?? undefined,
            answer: ['a', 'b', 'c', 'd'][answers.findIndex(a => a === q.correctAnswer)]
        };
    } 

    async getTestToDo (req, res) {
        try {
            const testId = Number(req.query.id);
            const studentId = Number(req.query.uid);
            const numQuestionsToGet = Number(req.query.n);

            const [ testData, testQuestions ] = await Promise.all([
                this.db.query(`
                    SELECT DISTINCT
                        \`tests\`.\`name\`,
                        CONCAT(\`users\`.\`firstName\`, " ", \`users\`.\`lastName\`) AS lecturerName,
                        \`subjects\`.\`subjectName\`
                    FROM \`tests\`
                    JOIN \`users\` ON \`tests\`.\`createdByLecturerId\` = \`users\`.\`userId\`
                    JOIN \`testQuestions\` ON \`tests\`.\`testId\` = \`testQuestions\`.\`testId\`
                    JOIN \`questions\` ON \`testQuestions\`.\`questionId\` = \`questions\`.\`questionId\`
                    JOIN \`subjects\` ON \`questions\`.\`subjectId\` = \`subjects\`.\`subjectId\` 
                    WHERE \`tests\`.\`testId\` = ?;
                `, [testId]),
                this.db.query(`
                    SELECT
                        \`questions\`.\`questionId\`,
                        \`questions\`.\`question\`,
                        \`questions\`.\`correctAnswer\`,
                        \`questions\`.\`incorrectAnswerA\`,
                        \`questions\`.\`incorrectAnswerB\`,
                        \`questions\`.\`incorrectAnswerC\`
                    FROM \`questions\`
                    JOIN \`testQuestions\` ON \`questions\`.\`questionId\` = \`testQuestions\`.\`questionId\`
                    WHERE \`testQuestions\`.\`testId\` = ?;
                `, [testId])
            ]);

            // test info: { testName, lecturer, subjects }
            const testInfo = testData.reduce((testInfo, curr) => ({
                    name: curr.name,
                    lecturer: curr.lecturerName,
                    subjects: testInfo.subjects.concat([curr.subjectName])
                }), { name: '', lecturer: '', subjects: [] });
            testInfo.subjects = testInfo.subjects.join(', ');
            
            // questions
            let questions = [];
            if (numQuestionsToGet >= testQuestions.length) {
                // use all questions in test
                questions = testQuestions.map(this._randomiseQuestionAnswers);
            } else {
                let weightedQuestions = await this._assembleWeightedQuestions(testQuestions, studentId);

                // choose questions at random
                while (questions.length < numQuestionsToGet) {
                    const nextQid = weightedQuestions[Math.floor(Math.random() * weightedQuestions.length)];
                    weightedQuestions = weightedQuestions.filter(q => q !== nextQid); // don't pick question again
                    const questionToAdd = testQuestions.find(q => q.questionId == nextQid);
                    questions.push(this._randomiseQuestionAnswers(questionToAdd));
                }
            }

            res.status(200).send({ newTestInfo: testInfo, newQuestions: questions });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = TestsController;