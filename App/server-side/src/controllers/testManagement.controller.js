class UsersController {
    constructor(db) {
        this.db = db;
    }

    getQuestions(req, res) { 
        this.db.query(`SELECT * FROM questions`)
            .then((rows) => { 
                res.json(rows)
            });
    }

    addQuestion(req, res) {
        this.db.query(`INSERT INTO questions (subjectId, createdByLecturerId) VALUES (0, 0)`)
            .then(({ insertId }) => {
                res.status(201).json({ questionId: Number(insertId) });
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
            `UPDATE TABLE questions
            SET question = ?, correctAnswer = ?, incorrectAnswerA = ?, incorrectAnswerB = ?, incorrectAnswerC = ?
            WHERE questionId = ?
        `, [question, correctAnswer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC, questionId])
            .then(() => {
                res.status(200)
            })
    }

    deleteQuestions(req, res) {
        const { questionIds } = req.body
  
        this.db.query(`DELETE FROM questions WHERE questionId IN (?)`, [questionIds])
            .then(() => {
                res.status(200)
            })
    }
}

module.exports = UsersController;
