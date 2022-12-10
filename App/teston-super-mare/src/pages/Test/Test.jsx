import React from 'react';
import './Test.css';
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    LinearProgress,
    Paper,
    Radio,
    RadioGroup,
    Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import TestController from './Test.controller';

const testController = new TestController();
const Test = ({ testName, testId, subjects, createdByLecturer, questions, userId }) => {
    const [questionAnswers, setQuestionAnswers] = useState(new Map(
        questions.map(q => [q.qid, null ])
    ));
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [alert, setAlert] = useState('');

    function answeredQuestions() {
        return Array.from(questionAnswers.values()).reduce((total, a) => a ? total + 1 : total, 0);
    }
    function correctlyAnsweredQuestions() {
        return questions.reduce((total, { qid }) => answeredQuestionCorrectly(qid) ? total + 1 : total, 0);
    }

    function maxQuestions() {
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
        const decimalComplete = answeredQuestions() / maxQuestions();
        setProgress(Math.ceil(decimalComplete * 100));
    }, [questionAnswers]);

    function onSubmitAnswers() {
        setHasSubmitted(true);
        setAlert('loading');
        testController.saveTestResults(
            questions.map(q => ({ qid: q.qid, correct: answeredQuestionCorrectly(q.qid) })), 
            userId
        ).then(response => {
            setAlert('success');
        }).catch(() => {
            setAlert('error');
        });
    }

    function answeredQuestionCorrectly(qid) {
        const correctAnswer = questions.find(q => q.qid === qid).answer;
        return questionAnswers.get(qid) === correctAnswer;
    }

    return (
        <Paper className='test'>
            {/*heading*/}
            <Stack spacing={1}>
                <h2 className='title'>{testName}</h2>
                <p className='subtitle'>{subjects.join(', ')} - created by {createdByLecturer}</p>
            </Stack>
            <Stack spacing={2} className='questions'>
                {/*test questions*/}
                {questions.map((q, i) => <Paper key={q.qid}>
                    <FormControl error={hasSubmitted && !answeredQuestionCorrectly(q.qid)} variant='standard'>
                        <FormLabel id={`question-${q.qid}`}>{i+1}) {q.question}</FormLabel>
                        <RadioGroup
                        aria-labelledby={`question-${q.qid}`}
                        name={`answers-${q.quid}`}
                        onChange={(e) => handleAnswerChoice(e, q.qid)}
                        >
                            {['a', 'b', 'c', 'd'].map(answerKey => q[answerKey]
                                ? <FormControlLabel key={`${q.qid}${answerKey}`} value={answerKey} control={
                                    <Radio disabled={hasSubmitted} color={hasSubmitted ? 'success' : undefined} />
                                } label={q[answerKey]} />
                                : null
                            )}
                        </RadioGroup>
                        {hasSubmitted ? <FormHelperText>
                            {answeredQuestionCorrectly(q.qid) ? 'Correct!' : `Incorrect, the answer was: ${q[q.answer]}`}
                        </FormHelperText> : null}
                    </FormControl>
                </Paper>)}
            </Stack>
            {/*questions done so far or test results*/}
            {!hasSubmitted
                ? <div className='testing-footer'>
                    <p>{answeredQuestions()}/{maxQuestions()} answered</p>
                    <LinearProgress variant='determinate' value={progress} />
                    <Button variant='outlined' onClick={onSubmitAnswers} disabled={(answeredQuestions() !== maxQuestions())}>
                        Submit
                    </Button>
                </div>
                : <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={3}>
                    {alert === 'loading' ? <>Saving... <CircularProgress /></>
                    : alert === 'error' ? <p>Error: results may not have been saved.</p>
                    : alert === 'success' ? <p>Results saved successfully.</p>
                    : null}
                    <p>{correctlyAnsweredQuestions()}/{maxQuestions()} correct</p>
                    <Button href='/' variant='outlined'>Go back</Button>
                </Stack>
            }
        </Paper>
    )
}

export default Test;