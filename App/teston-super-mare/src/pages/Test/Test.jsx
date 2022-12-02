import './Test.css';
import { Button, FormControl, FormControlLabel, FormLabel, LinearProgress, Paper, Radio, RadioGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const Test = ({ testName, testId, subjects, createdByLecturer, questions }) => {
    const [questionAnswers, setQuestionAnswers] = useState(new Map(
        questions.map(q => [q.qid, null ])
    ));
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);

    function getAnsweredQuestions() {
        return Array.from(questionAnswers.values()).reduce((total, a) => a ? total + 1 : total, 0);
    }

    function getMaxQuestions() {
        return questions.length;
    }

    function handleAnswerChoice(e, question) {
        // store answer choice
        const answer = e.target.value;
        const newQuestionAnswers = new Map(questionAnswers.entries())
        newQuestionAnswers.set(Number(question), answer);
        setQuestionAnswers(newQuestionAnswers);
    }

    useEffect(() => {
        // update progress bar every time a question is answered
        const decimalComplete = getAnsweredQuestions() / getMaxQuestions();
        setProgress(Math.ceil(decimalComplete * 100));
    }, [questionAnswers]);

    function onSubmitAnswers() {
        console.log(questionAnswers);
    }

    return (
        <Paper className='test'>
            <Stack spacing={1}>
                <h2 className='title'>{testName}</h2>
                <p className='subtitle'>{subjects.join(', ')} - created by {createdByLecturer}</p>
            </Stack>
            <Stack spacing={2} className='questions'>
                {questions.map((q, i) => <Paper key={q.qid}>
                    <FormControl>
                        <FormLabel id={`question-${q.qid}`}>{i+1}) {q.question}</FormLabel>
                        <RadioGroup
                        aria-labelledby={`question-${q.qid}`}
                        name={`answers-${q.quid}`}
                        onChange={(e) => handleAnswerChoice(e, q.qid)}
                        >
                            {['a', 'b', 'c', 'd'].map(answerKey => q[answerKey]
                                ? <FormControlLabel key={`${q.qid}${answerKey}`} value={answerKey} control={<Radio />} label={q[answerKey]} />
                                : null
                            )}
                        </RadioGroup>
                    </FormControl>
                </Paper>)}
            </Stack>
            {!hasSubmitted
                ? <div className='test-footer'>
                    <p>{getAnsweredQuestions()}/{getMaxQuestions()} answered</p>
                    <LinearProgress variant='determinate' value={progress} />
                    <Button
                    type='submit'
                    variant='outlined'
                    onClick={onSubmitAnswers}
                    disabled={(getAnsweredQuestions() !== getMaxQuestions())}>
                        Submit
                    </Button>
                </div>
                : <div>Finished test</div>
            }
        </Paper>
    )
}

export default Test;