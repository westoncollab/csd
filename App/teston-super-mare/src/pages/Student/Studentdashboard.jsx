import React from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { Tabs, Tab, Stack, Box, Paper, Typography } from '@mui/material';
import Leaderboard from './Leaderboard';

const columns = [
    //{ field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'testName',
        headerName: 'Test Name',
        width: 200,
        editable: true,
        sortable: true,
    },
    {
        field: 'subject',
        headerName: 'Subject',
        width: 200,
        editable: true,
        sortable: true,
    },
    {
        field: 'lecturer',
        headerName: 'Lecturer',
        width: 200,
        editable: true,
        sortable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        width: 200,
    },
    {
        field: 'takeTest',
        headerName: 'Take Test',
        sortable: false,
        width: 200,
        cellRenderer: ({ id }) => (
            <button>Take Test</button>
        ),
    },
];

const rows = [
    { id: 1, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available", takeTest: <button>Take Test</button> },
    { id: 2, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available" },
    { id: 3, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available" },
    { id: 4, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available" },

];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Stack 
                    sx={{ 
                        height: '60vh', 
                        width: '70vw' 
                    }}
                    spacing={2}
                >
                    {children}
                </Stack>
            )}
        </Box>
    );
}

export default function StudentDashboard({ user }) {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (_event, newIndex) => {
        setTabIndex(newIndex);
    };
 
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
                <Stack spacing={2} >
                    <Typography variant="h5" component="div">
                        {`Hello, ${user?.email ?? "Student"}! 📖`}
                    </Typography>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <Tabs value={tabIndex} onChange={handleChange} aria-label="lecturer tabs">
                            <Tab label="Test Management" />
                            <Tab label="Leaderboard" />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabIndex} index={0}>
                        <Stack
                            sx={{ width: '70vw', height: '60vh' }}
                            spacing={2}
                        >
                            <DataGrid
                                autoPageSize
                                rows={rows}
                                columns={columns}
                                density="compact"                     
                            />
                        </Stack>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Leaderboard userId={user?.userId ?? 1} />
                        </Box>
                    </TabPanel>
                </Stack>
            </Paper>
        </Box>
    )
}


