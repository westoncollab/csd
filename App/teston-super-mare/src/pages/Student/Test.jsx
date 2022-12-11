import { Button, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, LinearProgress, Paper, Radio, RadioGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TestService from '../../services/test.service';

const testService = new TestService();
const Test = ({ user }) => {
    const { userId } = user;
    const { testId } = useParams();
    const [testName, setTestName] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [createdByLecturer, setLecturer] = useState('');
    const [questions, setQuestions] = useState([]);
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
        testService.saveTestResults(
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
        <Paper style={{
            width: '50vw',
            height: 'CALC(100vh - 143px - 100px)'
        }} sx={{ p: 5 }}>
            <Stack sx={{ height: 1 }} spacing={3} alignItems='center'>
                {/* heading */}
                <Stack spacing={1} direction='row' alignItems='baseline'> 
                    <h2>{testName}</h2>
                    <p>{subjects.join(', ')} - created by {createdByLecturer}</p>
                </Stack>
                
                {/*test questions*/}
                <Stack spacing={2} sx={{
                    backgroundColor: 'lightgrey',
                    overflowY: 'scroll',
                    p: 1.2,
                    width: 0.8,
                    minWidth: 360
                }}>
                    {questions.map((q, i) => <Paper key={q.qid}>
                        <FormControl error={hasSubmitted && !answeredQuestionCorrectly(q.qid)} variant='standard' sx={{ p: 1 }}>
                            <FormLabel id={`question-${q.qid}`}>{i+1}) {q.question}</FormLabel>
                            <RadioGroup
                            aria-labelledby={`question-${q.qid}`}
                            name={`answers-${q.quid}`}
                            onChange={(e) => handleAnswerChoice(e, q.qid)}
                            >
                                {['a', 'b', 'c', 'd'].map(answerKey => q[answerKey]
                                    ? <FormControlLabel key={`${q.qid}${answerKey}`} value={answerKey} control={
                                        <Radio disabled={hasSubmitted} color={hasSubmitted ? 'success' : undefined} sx={{ height: 32 }} />
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
                    ? <Stack direction='row' spacing={3} sx={{ width: 1 }} justifyContent='center'>
                        <p>{answeredQuestions()}/{maxQuestions()} answered</p>
                        <LinearProgress variant='determinate' value={progress} sx={{ width: 0.65 }}/>
                        <Button variant='outlined' onClick={onSubmitAnswers} disabled={(answeredQuestions() !== maxQuestions())}>
                            Submit
                        </Button>
                    </Stack>
                    : <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={3}>
                        {alert === 'loading' ? <>Saving... <CircularProgress /></>
                        : alert === 'error' ? <p>Error: results may not have been saved.</p>
                        : alert === 'success' ? <p>Results saved successfully.</p>
                        : null}
                        <p>{correctlyAnsweredQuestions()}/{maxQuestions()} correct</p>
                        <Button href='/' variant='outlined'>Go back</Button>
                    </Stack>
                }
            </Stack>
        </Paper>
    )
}

export default Test;