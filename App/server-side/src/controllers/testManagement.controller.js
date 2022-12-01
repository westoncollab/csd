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

        console.log(questionId)
        console.log(question)
        
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

module.exports = UsersController;
