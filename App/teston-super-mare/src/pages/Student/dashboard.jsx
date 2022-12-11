import React from 'react';
import { Tabs, Tab, Stack, Box, Paper, Typography } from '@mui/material';
import TestSelection from './selectTest';
import Leaderboard from './Leaderboard';

export default function StudentDashboard({ user }) {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (_event, newIndex) => {
        setTabIndex(newIndex);
    };

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
 
    return (
        <Box
            sx={{
                display: 'flex',
                width: 1, height: 1,
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
                        <TestSelection user={user} />
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