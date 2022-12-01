import './Test.css';
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack } from '@mui/material';
import { useState } from 'react';

const Test = ({ testName, testId, subjects, createdByLecturer, questions }) => {
    const [questionAnswers, setQuestionAnswers] = useState(questions.map(q => ({ quid: q.qid, answer: null })));
    const [hasSubmitted, setHasSubmitted] = useState(false);

    return (
        <Paper className='test'>
            <Stack direction='row' spacing={2}>
                <h2>{testName}</h2>
                <p className='subtitle'>{subjects.join(', ')} - created by {createdByLecturer}</p>
            </Stack>
            <Stack spacing={1} className='questions'>
                {questions.map(q => <Paper>
                    <FormControl>
                        <FormLabel id={`question-${q.qid}`}>{q.question}</FormLabel>
                        <RadioGroup aria-labelledby={`question-${q.qid}`} name={`answers-${q.quid}`}>
                            {['a', 'b', 'c', 'd'].map(answerKey => q[answerKey]
                                ? <FormControlLabel value={answerKey} control={<Radio />} label={q[answerKey]} />
                                : null
                            )}
                        </RadioGroup>
                    </FormControl>
                </Paper>)}
            </Stack>
            {!hasSubmitted
                ? <div>Doing test</div>
                : <div>Finished test</div>
            }
        </Paper>
    )
}

export default Test;