import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import TestService from '../../services/test.service';
import { useNavigate } from 'react-router-dom';

const testService = new TestService();
const TestSelection = ({ user }) => {
    const [rows, setRows] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        testService.getTests(user.subject ?? 1).then(setRows);
    }, []);

    function openTest(testId) {
        navigate(`/test/${testId}`);
    }

    const columns = [
        { field: 'testName', headerName: 'Test Name', flex: 1, editable: true, sortable: true },
        { field: 'subjects', headerName: 'Subject/s', flex: 1, editable: true, sortable: true },
        { field: 'lecturerName', headerName: 'Lecturer', flex: 1, editable: true, sortable: true },
        // { field: 'status', headerName: 'Status', flex: 1, sortable: true },
        { field: 'takeTest', headerName: 'Take Test', width: 200,
            renderCell: (params) => {
                const { testName, id } = params.row;
                return (
                    <Button variant='contained' size='small' sx={{ width: 1 }} onClick={() => openTest(id)}>
                        Start {testName}
                    </Button>
                )
            },
        },
    ];

    return (
        <Stack sx={{ width: '70vw', height: '60vh' }} spacing={2}>
            <DataGrid
                autoPageSize
                rows={rows}
                columns={columns}
                density="compact"                     
            />
        </Stack>
    )
}

export default TestSelection;