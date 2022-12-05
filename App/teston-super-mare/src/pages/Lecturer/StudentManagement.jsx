import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Stack, Paper, Button } from '@mui/material';

const columns = [
    { field: 'firstName', flex: 1, editable: true },
    { field: 'lastName', flex: 1, editable: true },
    { field: 'email', flex: 1, editable: true },
    { field: 'lastLoginTime', type: 'dateTime', flex: 1 },
    { field: 'isApproved', flex: 1, type: 'boolean', editable: true }
];

function mockLoadStudents() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { userId: 0, firstName: 'Test1', lastName: 'Test1', email: 'Test1@test.ac.uk', lastLoginTime: '2022-12-03 17:54:10', isApproved: true },
                { userId: 1, firstName: 'Test2', lastName: 'Test2', email: 'Test2@test.ac.uk', lastLoginTime: '2022-12-03 17:54:10', isApproved: false }
            ])
        }, 200)
    })
}

export default function StudentManagement() {
    const [studentRows, setStudentRows] = React.useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = React.useState([]);

    const buttonsDisabled = selectedStudentIds.length < 1;

    React.useEffect(() => {
        mockLoadStudents().then(setStudentRows);
    }, []);

    function handleUpdateStudent(studentRow) {
        // await userService.updateUser()
        setStudentRows(rows => {
            const index = rows.findIndex(row => row.userId === studentRow.userId);
            const copy = rows.slice();
            copy[index] = studentRow;
            return copy;
        })

        return studentRow;
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
                    sx={{ width: '70vw', height: '60vh' }}
                    spacing={2}
                >
                    <DataGrid
                        checkboxSelection
                        autoPageSize
                        rows={studentRows}
                        columns={columns}
                        density="compact"
                        experimentalFeatures={{ newEditingApi: true }}
                        selectionModel={selectedStudentIds}
                        onSelectionModelChange={setSelectedStudentIds}
                        getRowId={row => row.userId}
                        processRowUpdate={handleUpdateStudent}
                        onProcessRowUpdateError={(e) => console.log(e)}
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={buttonsDisabled}
                        >
                            Disable
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={buttonsDisabled}
                        >
                            Terminate
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            variant="outlined"
                            color="success"
                            disabled={buttonsDisabled}
                        >
                            Approve
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}
