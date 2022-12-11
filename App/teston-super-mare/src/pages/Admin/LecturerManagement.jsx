import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Stack, Button } from '@mui/material';
import UsersService from '../../services/users.service';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import CreateLecturerDialog from './CreateLecturerDialog';

function formatLastLoginTime(date) {
    if (!date.value) {
        // The lecturer has not ever logged in.
        return 'Never logged in'
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

export default function LecturerManagement() {
    const [lecturerRows, setLecturerRows] = React.useState([]);
    const [selectedLecturerIds, setSelectedLecturerIds] = React.useState([]);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
    const [createLecturerDialogOpen, setCreateLecturerDialogOpen] = React.useState(false);

    const buttonsDisabled = selectedLecturerIds.length < 1;

    React.useEffect(() => {
        usersService.getLecturers().then(setLecturerRows);
    }, []);

    function handleUpdateLecturer(lecturerRow) {
        // Update on the server.
        usersService.updateLecturer(lecturerRow);

        // Update on the client.
        setLecturerRows(rows => {
            const index = rows.findIndex(row => row.userId === lecturerRow.userId);
            const copy = rows.slice();
            copy[index] = lecturerRow;
            return copy;
        })

        return lecturerRow;
    }

    function handleTerminateClick() {
        setConfirmationDialogOpen(true);
    }

    function handleTerminateConfirmClick() {
        setConfirmationDialogOpen(false);

        // Delete on the server.
        usersService.deleteLecturers(selectedLecturerIds);

        // Delete on the client.
        setLecturerRows(rows => rows.filter(row => !selectedLecturerIds.includes(row.userId)));
    }

    function handleTerminateCancelClick() {
        setConfirmationDialogOpen(false);
    }

    function handleLecturerCreated(lecturerRow) {
        setLecturerRows(rows => rows.concat([lecturerRow]));
        setCreateLecturerDialogOpen(false);
    }

    return (
        <>
            <ConfirmationDialog
                open={confirmationDialogOpen}
                onCancel={handleTerminateCancelClick}
                onConfirm={handleTerminateConfirmClick}
                title="Are you sure you want to terminate these accounts?"
                contentText="This is a irreversible, potentially destructive action. Are you sure you wish to proceed?"
            />
            <CreateLecturerDialog
                open={createLecturerDialogOpen}
                onCancel={() => { setCreateLecturerDialogOpen(false) }}
                onClose={() => { setCreateLecturerDialogOpen(false) }}
                onLecturerCreated={handleLecturerCreated}
                usersService={usersService}
            />
            <DataGrid
                checkboxSelection
                autoPageSize
                rows={lecturerRows}
                columns={columns}
                density="compact"
                experimentalFeatures={{ newEditingApi: true }}
                selectionModel={selectedLecturerIds}
                onSelectionModelChange={setSelectedLecturerIds}
                getRowId={row => row.userId}
                processRowUpdate={handleUpdateLecturer}
                onProcessRowUpdateError={(e) => console.log(e)}
                components={{ Toolbar: GridToolbar }}
            />
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => setCreateLecturerDialogOpen(true)}
                >
                    Create Lecturer
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    disabled={buttonsDisabled}
                    onClick={handleTerminateClick}
                >
                    Terminate selected
                </Button>
            </Stack>
        </>
    )
}
