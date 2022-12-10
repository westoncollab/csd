import React from 'react';
import { Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SubjectsService from '../../services/subjects.service';
import CreateSubjectDialog from './CreateSubjectDialog';

const columns = [
    { field: 'subjectName', headerName: 'Subject', flex: 1, editable: true }
];

const subjectsService = new SubjectsService();

export default function SubjectManagement() {
    const [subjectRows, setSubjectRows] = React.useState([]);
    const [addSubjectDialogOpen, setAddSubjectDialogOpen] = React.useState(false);

    React.useEffect(() => {
        subjectsService.getAllSubjects().then(setSubjectRows);
    }, []);

    function handleSubjectCreated(subjectRow) {
        setSubjectRows(rows => {
            return rows.concat([subjectRow])
        })
    }

    return (
        <>
            <CreateSubjectDialog
                subjectsService={subjectsService}
                open={addSubjectDialogOpen}
                onClose={() => setAddSubjectDialogOpen(false)}
                onCancel={() => setAddSubjectDialogOpen(false)}
                onSubjectCreated={handleSubjectCreated}
                isDuplicate={subjectName => subjectRows.map(subject => subject.subjectName).includes(subjectName)}
            />
            <DataGrid
                autoPageSize
                rows={subjectRows}
                columns={columns}
                density="compact"
                getRowId={row => row.subjectId}
                components={{ Toolbar: GridToolbar }}
            />
            <Stack direction="row">
                <Button 
                    variant="outlined"
                    color="success"
                    onClick={() => setAddSubjectDialogOpen(true)}
                >
                    Add Subject
                </Button>
            </Stack>
        </>
    )
}
