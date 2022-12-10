class TestManagementController {
    constructor(db) {
        this.db = db;
    }

    getTests(req, res) {
        this.db.query(`SELECT testId, name FROM tests`)
            .then((rows) => {
                res.json(rows);
            });
    }

    addTest(req, res) {
        const { testName } = req.body;

        this.db.query(`INSERT INTO tests (name, createdByLecturerId) VALUES (?, 0)`, [testName])
            .then(({ insertId }) => {
                res.status(201).json({ testId: Number(insertId), name: testName });
            });
    }

    getQuestions(req, res) { 
        const { testId } = req.params

        this.db.query(`
            SELECT 
                questions.questionId, question, correctAnswer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC, subjects.subjectName 
            FROM 
                questions 
            INNER JOIN 
                testQuestions ON testQuestions.questionId = questions.questionId 
            INNER JOIN
                subjects ON subjects.subjectId = questions.subjectId
            WHERE 
                testQuestions.testId = ?`, 
            [testId])
            .then((rows) => { 
                res.json(rows)
            });
    }

    addQuestion(req, res) {
        const {
            testId,
            newQuestion,
            newCorrectAnswer, newIncorrectAnswer1, newIncorrectAnswer2, newIncorrectAnswer3,
            newQuestionSubjectId
        } = req.body;

        this.db.query(`
            INSERT INTO questions (
                question,
                correctAnswer,
                incorrectAnswerA,
                ${newIncorrectAnswer2 ? 'incorrectAnswerB,' : ''}
                ${newIncorrectAnswer3 ? 'incorrectAnswerC,' : ''}
                subjectId,
                createdByLecturerId
            ) VALUES (
                ?, ?, ?, ${newIncorrectAnswer2 ? '?,' : ''}${newIncorrectAnswer3 ? '?,' : ''} ?, 0
            );
        `, [newQuestion, newCorrectAnswer, newIncorrectAnswer1]
            .concat(newIncorrectAnswer2 ? [newIncorrectAnswer2] : [])
            .concat(newIncorrectAnswer3 ? [newIncorrectAnswer3] : [])
            .concat([newQuestionSubjectId])
        ).then(({ insertId }) => {
                this.db.query(`INSERT INTO testQuestions (testId, questionId) VALUES (?, ?)`, [testId, insertId])
                    .then(() => res.status(201).json({ questionId: Number(insertId) }));
            });
    }

    updateQuestion(req, res) {
        // If the argument is 'undefined', convert it to 'null' so it can be sent to the database.
        function undefinedGuard(arg) {
            return arg === undefined ? null : arg 
        }

        const { 
            questionId,
            question, 
            correctAnswer, 
            incorrectAnswerA, 
            incorrectAnswerB,
            incorrectAnswerC 
        } = req.body 

        this.db.query(
            `UPDATE questions
            SET question = ?, correctAnswer = ?, incorrectAnswerA = ?, incorrectAnswerB = ?, incorrectAnswerC = ?
            WHERE questionId = ?`, 
            [
                undefinedGuard(question), 
                undefinedGuard(correctAnswer), 
                undefinedGuard(incorrectAnswerA), 
                undefinedGuard(incorrectAnswerB), 
                undefinedGuard(incorrectAnswerC), 
                questionId
            ])
            .then(() => {
                res.status(200).send();
            })
    }

    deleteQuestions(req, res) {
        const { questionIds } = req.body
  
        this.db.query(`DELETE FROM questions WHERE questionId IN (?)`, [questionIds])
            .then(() => {
                res.status(200).send();
            })
    }
}

module.exports = TestManagementController;
