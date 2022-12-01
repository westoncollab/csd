import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import TestManagementService from '../../services/TestManagement.service'

const columns = [
    { field: 'question', headerName: 'Question', flex: 3, editable: true },
    { field: 'answerA', headerName: 'Correct Answer', flex: 1, editable: true },
    { field: 'answerB', headerName: 'Incorrect Answer 1', flex: 1, editable: true },
    { field: 'answerC', headerName: 'Incorrect Answer 2', flex: 1, editable: true },
    { field: 'answerD', headerName: 'Incorrect Answer 3', flex: 1, editable: true }
];

const testService = new TestManagementService();
const testName = 'Sample Test'

export default function TestManagement() {
    const [rows, setRows] = React.useState([]);
    const [selectedRowIds, setSelectedRowIds] = React.useState([]);

    React.useEffect(() => {
        testService.getQuestions(testName).then(setRows)
    }, []);

    async function handleAddQuestion() {
        const questionRow = await testService.addQuestion(testName);
        setRows(rows => rows.concat([questionRow]));
    }

    async function handleDeleteQuestions() {  
        testService.deleteQuestions(selectedRowIds);
        setRows(rows => rows.filter(row => !selectedRowIds.includes(row.questionId)));
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
                <Stack 
                    sx={{ width: 1200, height: 600 }}
                    spacing={2}
                >
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
                    />
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Button 
                            variant="contained"
                            onClick={handleAddQuestion}
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
