import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { 
    Box, Stack, Paper, Button, InputLabel, MenuItem, FormControl, TextField, Dialog, 
    DialogActions, DialogContent, DialogTitle, Select, Typography 
} 
from '@mui/material'
import TestManagementService from '../../services/TestManagement.service'

const columns = [
    { field: 'question', headerName: 'Question', flex: 3, editable: true },
    { field: 'correctAnswer', headerName: 'Correct Answer', flex: 1, editable: true },
    { field: 'incorrectAnswerA', headerName: 'Incorrect Answer 1', flex: 1, editable: true },
    { field: 'incorrectAnswerB', headerName: 'Incorrect Answer 2', flex: 1, editable: true },
    { field: 'incorrectAnswerC', headerName: 'Incorrect Answer 3', flex: 1, editable: true }
];

const testService = new TestManagementService(); 

export default function TestManagement() {
    const [tests, setTests] = React.useState([]);
    const [testSelectedId, setTestSelectedId] = React.useState();
    const [newTestDialogOpen, setNewTestDialogOpen] = React.useState(false);
    const [newTestName, setNewTestName] = React.useState('New Test');

    const [rows, setRows] = React.useState([]);
    const [selectedRowIds, setSelectedRowIds] = React.useState([]);

    React.useEffect(() => {
        testService.getTests().then(setTests)
    }, []);


    async function handleAddQuestion() {
        if (testSelectedId) {
            const questionRow = await testService.addQuestion(testSelectedId);
            setRows(rows => rows.concat([questionRow]));
        }
    }

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

    async function handleCreateNewTestClick() {
        const test = await testService.addTest(newTestName);  
        setTests(tests => tests.concat([test]));
        handleCloseNewTestDialog();
    }

    function handleNewTestNameInput(event) {
        setNewTestName(event.target.value);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper sx={{ p: 2 }}>
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

                <Stack
                    sx={{ width: 1200, height: 600 }}
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
                            onClick={handleAddQuestion}
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
            </Paper>
        </Box>
    )
}
