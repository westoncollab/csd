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
                questions.questionId, question, correctAnswer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC 
            FROM 
                questions 
            INNER JOIN 
                testQuestions ON testQuestions.questionId = questions.questionId 
            WHERE 
                testQuestions.testId = ?`, 
            [testId])
            .then((rows) => { 
                res.json(rows)
            });
    }

    addQuestion(req, res) {
        const { testId } = req.body; 

        this.db.query(`INSERT INTO questions (subjectId, createdByLecturerId) VALUES (0, 0)`)
            .then(({ insertId }) => {
                this.db.query(`INSERT INTO testQuestions (testId, questionId) VALUES (?, ?)`, [testId, insertId])
                    .then(() => res.status(201).json({ questionId: Number(insertId) }));
            });
    }

    updateQuestion(req, res) {
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
            WHERE questionId = ?
        `, [question ?? null, correctAnswer ?? null, incorrectAnswerA?? null, incorrectAnswerB?? null, incorrectAnswerC?? null, questionId])
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
