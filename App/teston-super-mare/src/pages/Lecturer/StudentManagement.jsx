import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Stack, Paper, Button } from '@mui/material';
import UsersService from '../../services/users.service';

function formatLastLoginTime(date) {
    if (date.value === null) {
        // The student has not ever logged in.
        return 'Never logged'
    }
    return new Date(date.value).toLocaleString();
}
 
const columns = [
    { field: 'firstName', headerName: 'First name', flex: 1, editable: true },
    { field: 'lastName', headerName: 'Last name', flex: 1, editable: true },
    { field: 'email', headerName: 'Email', flex: 1, editable: true },
    { field: 'lastLoginTime', headerName: 'Last Login Time', valueFormatter: formatLastLoginTime, type: 'dateTime', flex: 1 },
    { field: 'isApproved', headerName: 'Is Approved', flex: 0.5, type: 'boolean', editable: true }
]; 

const usersService = new UsersService();

export default function StudentManagement() {
    const [studentRows, setStudentRows] = React.useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = React.useState([]);

    const buttonsDisabled = selectedStudentIds.length < 1;

    React.useEffect(() => {
        usersService.getStudents().then(setStudentRows);
    }, []);

    function handleUpdateStudent(studentRow) {
        // Update on the server.
        usersService.updateStudent(studentRow);

        // Update on the client.
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
                        components={{ Toolbar: GridToolbar }}
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
                            Terminate selected
                        </Button> 
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}
