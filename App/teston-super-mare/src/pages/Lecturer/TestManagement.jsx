import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {
    Stack, Input, Button, InputLabel, MenuItem, FormControl, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle, Select, Typography
} from '@mui/material'
import TestManagementService from '../../services/TestManagement.service'
import SubjectsService from '../../services/subjects.service';

const columns = [
    { field: 'question', headerName: 'Question', flex: 3 },
    { field: 'correctAnswer', headerName: 'Correct Answer', flex: 1 },
    { field: 'incorrectAnswerA', headerName: 'Incorrect Answer 1', flex: 1 },
    { field: 'incorrectAnswerB', headerName: 'Incorrect Answer 2', flex: 1 },
    { field: 'incorrectAnswerC', headerName: 'Incorrect Answer 3', flex: 1 },
    { field: 'subjectName', headerName: 'Subject', flex: 1 }
];

const testService = new TestManagementService();
const subjectsService = new SubjectsService();

export default function TestManagement() {
    const [tests, setTests] = React.useState([]);
    const [testSelectedId, setTestSelectedId] = React.useState();
    const [newTestDialogOpen, setNewTestDialogOpen] = React.useState(false);
    const [newTestName, setNewTestName] = React.useState('New Test');

    const [newQuestionDialogOpen, setNewQuestionDialogOpen] = React.useState(false);
    const [newQuestion, setNewQuestion] = React.useState('');
    const [newCorrectAnswer, setNewCorrectAnswer] = React.useState('');
    const [newIncorrectAnswer1, setNewIncorrectAnswer1] = React.useState('');
    const [newIncorrectAnswer2, setNewIncorrectAnswer2] = React.useState('');
    const [newIncorrectAnswer3, setNewIncorrectAnswer3] = React.useState('');
    const [allSubjects, setAllSubjects] = React.useState([]);
    const [newQuestionSubjectId, setNewQuestionSubjectId] = React.useState('');

    const [rows, setRows] = React.useState([]);
    const [selectedRowIds, setSelectedRowIds] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            return {
                tests: await testService.getTests(),
                subjects: await subjectsService.getAllSubjects()
            };
        };
        getData().then(({ tests, subjects }) => {
            setTests(tests);
            setAllSubjects(subjects);
        })
    }, []);

    async function handleDeleteQuestions() {
        testService.deleteQuestions(selectedRowIds);
        setRows(rows => rows.filter(row => !selectedRowIds.includes(row.questionId)));
    }

    async function handleUpdateQuestion(questionRow) {
        await testService.updateQuestion(questionRow)
        setRows(rows => {
            const index = rows.findIndex(row => row.questionId === questionRow.questionId)
            const copy = rows.slice()
            copy[index] = questionRow
            return copy
        })

        return questionRow
    }

    async function handleTestChange(event) {
        const newTest = event.target.value
        if (newTest) {
            setTestSelectedId(newTest.testId)
            const questions = await testService.getQuestions(newTest.testId)
            setRows(questions)
        }
    }

    function handleOpenNewTestDialog() {
        setNewTestDialogOpen(true);
    }

    function handleCloseNewTestDialog() {
        setNewTestDialogOpen(false);
    }

    function handleOpenNewQuestionDialog() { setNewQuestionDialogOpen(true); }
    async function handleCreateNewQuestionClick() {
        if (testSelectedId && newQuestion && newCorrectAnswer && newIncorrectAnswer1 && newQuestionSubjectId) {
            const questionRow = await testService.addQuestion(testSelectedId,
                {
                    newQuestion,
                    newCorrectAnswer, newIncorrectAnswer1, newIncorrectAnswer2, newIncorrectAnswer3,
                    newQuestionSubjectId
                }
            );
            setRows(rows => rows.concat([{
                question: newQuestion,
                correctAnswer: newCorrectAnswer,
                incorrectAnswerA: newIncorrectAnswer1,
                incorrectAnswerB: newIncorrectAnswer2,
                incorrectAnswerC: newIncorrectAnswer3,
                subjectName: allSubjects.find(s => s.subjectId === newQuestionSubjectId).subjectName,
                ...questionRow
            }]));
        }
        handleCloseNewQuestionDialog();
    }
    function handleCloseNewQuestionDialog() { setNewQuestionDialogOpen(false); }

    async function handleCreateNewTestClick() {
        const test = await testService.addTest(newTestName);
        setTests(tests => tests.concat([test]));
        handleCloseNewTestDialog();
    }

    function handleNewTestNameInput(event) {
        setNewTestName(event.target.value);
    }

    return (
        <>
            <Dialog
                open={newTestDialogOpen}
                onClose={handleCloseNewTestDialog}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    Create a New Test
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography>
                            Please enter the name of the new test.
                        </Typography>
                        <TextField
                            required
                            label="Required"
                            value={newTestName}
                            onChange={handleNewTestNameInput}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewTestDialog}>Cancel</Button>
                    <Button onClick={handleCreateNewTestClick} autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

                <Dialog
                    open={newQuestionDialogOpen}
                    onClose={handleCloseNewQuestionDialog}
                    fullWidth
                    maxWidth="xs">
                    <DialogTitle>Create a New Question</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            <FormControl>
                                <InputLabel htmlFor='question-input'>Question</InputLabel>
                                <Input
                                    id='question-input' name='question'
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    type='input'
                                    required />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor='correct-input'>Correct answer</InputLabel>
                                <Input
                                    id='correct-input' name='correct'
                                    value={newCorrectAnswer}
                                    onChange={(e) => setNewCorrectAnswer(e.target.value)}
                                    type='input'
                                    required />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor='incorrect1-input'>Incorrect answer 1</InputLabel>
                                <Input
                                    id='incorrect1-input' name='incorrect1'
                                    value={newIncorrectAnswer1}
                                    onChange={(e) => setNewIncorrectAnswer1(e.target.value)}
                                    required />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor='incorrect2-input'>Incorrect answer 2</InputLabel>
                                <Input
                                    id='incorrect2-input' name='incorrect2'
                                    value={newIncorrectAnswer2}
                                    onChange={(e) => setNewIncorrectAnswer2(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor='incorrect3-input'>Incorrect answer 3</InputLabel>
                                <Input
                                    id='incorrect3-input' name='incorrect3'
                                    value={newIncorrectAnswer3}
                                    onChange={(e) => setNewIncorrectAnswer3(e.target.value)}/>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id='subject-select-label'>Subject</InputLabel>
                                <Select required
                                        labelId='subject-select-label'
                                        id='subject-select'
                                        value={newQuestionSubjectId}
                                        label='Subject'
                                        onChange={(e) => setNewQuestionSubjectId(e.target.value)}
                                >
                                    {allSubjects.map(s =>
                                        <MenuItem key={s.subjectId} value={s.subjectId}>{s.subjectName}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewQuestionDialog}>Cancel</Button>
                        <Button onClick={handleCreateNewQuestionClick} autoFocus>Create</Button>
                    </DialogActions>
                </Dialog>

                <Stack
                    sx={{ width: '70vw', height: '60vh' }}
                    spacing={2}
                >
                    <Stack spacing={2} direction="row" >
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleOpenNewTestDialog}
                        >
                            Add New
                        </Button>
                        <FormControl fullWidth>
                            <InputLabel id="test-select-label">Test</InputLabel>
                            <Select
                                labelId="test-select-label"
                                id="test-select"
                                defaultValue=""
                                label="Test"
                                onChange={handleTestChange}
                            >
                                {tests.map((test) => (
                                    <MenuItem key={test.testId} value={test}>{test.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <DataGrid
                        checkboxSelection
                        autoPageSize
                        rows={rows}
                        columns={columns}
                        density="compact"
                        experimentalFeatures={{ newEditingApi: true }}
                        selectionModel={selectedRowIds}
                        onSelectionModelChange={setSelectedRowIds}
                        getRowId={row => row.questionId}
                        processRowUpdate={handleUpdateQuestion}
                        onProcessRowUpdateError={(e) => console.log(e)}
                    />
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleOpenNewQuestionDialog}
                            disabled={!testSelectedId}
                        >
                            Add Question
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={selectedRowIds.length < 1}
                            onClick={handleDeleteQuestions}
                        >
                            Delete Selected
                        </Button>
                    </Stack>
                </Stack>
            </>
    )
}
