import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import StudentManagement from './StudentManagement';
import TestManagement from './TestManagement';

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

export default function LecturerDashboard({ user }) {
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
                        {`Hello, ${user?.email ?? "Lecturer"}! 🎓`}
                    </Typography>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <Tabs value={tabIndex} onChange={handleChange} aria-label="lecturer tabs">
                            <Tab label="Test Management" />
                            <Tab label="Student Management" />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabIndex} index={0}>
                        <TestManagement />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <StudentManagement />
                    </TabPanel>
                </Stack>
            </Paper>
        </Box>
    )
}

